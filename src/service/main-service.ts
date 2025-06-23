import { prismaClient } from "../application/database";
import { logger } from "../application/logging";
import { ResponseError } from "../error/response-error";
import { StockStat, Stats } from "../model/statistic-model";
import { getISOWeek, getYear } from "date-fns";



export class MainService {
    static async get(): Promise<Stats> {
        const overStock = await prismaClient.kanban.findMany({
            where: {
                balance: { gt: prismaClient.kanban.fields.max_quantity },
            },
        });

        const underStock = await prismaClient.kanban.findMany({
            where: {
                balance: { lt: prismaClient.kanban.fields.min_quantity },
            },
        });

        const unBalanced = await prismaClient.kanban.findMany({
            where: {
                balance: { lt: prismaClient.kanban.fields.js_ending_quantity },
            },
        });

        const kanbans = await prismaClient.kanban.findMany({
            where: {
                balance: { lt: prismaClient.kanban.fields.min_quantity },
            },
            include: {
                purchase_order_detail: true,
                purchase_request_detail: true,
            },
        });

        const unProcessed = kanbans.filter(
            (k) =>
                k.min_quantity && k.balance < k.min_quantity &&
                k.purchase_order_detail.filter((po) => po.is_active).length === 0 &&
                k.purchase_request_detail.filter((pr) => pr.is_active).length === 0
        ).length;

        const dailyFrom = new Date();
        dailyFrom.setDate(dailyFrom.getDate() - 30);

        const stockInDailyRaw = await prismaClient.stockIn.findMany({
            where: { created_at: { gte: dailyFrom } },
            select: { created_at: true, quantity: true },
        });

        const stockOutDailyRaw = await prismaClient.stockOut.findMany({
            where: { created_at: { gte: dailyFrom } },
            select: { created_at: true, quantity: true },
        });

        const groupByDate = (data: { created_at: Date; quantity: number }[]): StockStat =>
            data.reduce((acc: StockStat, item) => {
                const key = item.created_at.toISOString().split("T")[0];
                acc[key] = (acc[key] || 0) + item.quantity;
                return acc;
            }, {});

        const stockInDaily = groupByDate(stockInDailyRaw);
        const stockOutDaily = groupByDate(stockOutDailyRaw);

        const weekFrom = new Date();
        weekFrom.setMonth(weekFrom.getMonth() - 3);

        const stockInWeeklyRaw = await prismaClient.stockIn.findMany({
            where: { created_at: { gte: weekFrom } },
            select: { created_at: true, quantity: true },
        });

        const stockOutWeeklyRaw = await prismaClient.stockOut.findMany({
            where: { created_at: { gte: weekFrom } },
            select: { created_at: true, quantity: true },
        });

        const groupByWeek = (data: { created_at: Date; quantity: number }[]): StockStat =>
            data.reduce((acc: StockStat, item) => {
                const week = getISOWeek(item.created_at);
                const year = getYear(item.created_at);
                const key = `${year}-W${week}`;
                acc[key] = (acc[key] || 0) + item.quantity;
                return acc;
            }, {});

        const stockInWeekly = groupByWeek(stockInWeeklyRaw);
        const stockOutWeekly = groupByWeek(stockOutWeeklyRaw);

        const yearStart = new Date(new Date().getFullYear(), 0, 1);

        const stockInMonthlyRaw = await prismaClient.stockIn.findMany({
            where: { created_at: { gte: yearStart } },
            select: { created_at: true, quantity: true },
        });

        const stockOutMonthlyRaw = await prismaClient.stockOut.findMany({
            where: { created_at: { gte: yearStart } },
            select: { created_at: true, quantity: true },
        });

        const groupByMonth = (data: { created_at: Date; quantity: number }[]): StockStat =>
            data.reduce((acc: StockStat, item) => {
                const key = item.created_at.toISOString().slice(0, 7); // YYYY-MM
                acc[key] = (acc[key] || 0) + item.quantity;
                return acc;
            }, {});

        const stockInMonthly = groupByMonth(stockInMonthlyRaw);
        const stockOutMonthly = groupByMonth(stockOutMonthlyRaw);

        return {
            overStock: overStock.length,
            underStock: underStock.length,
            unBalanced: unBalanced.length,
            unProcessed,
            stockIn: {
                daily: stockInDaily,
                weekly: stockInWeekly,
                monthly: stockInMonthly,
            },
            stockOut: {
                daily: stockOutDaily,
                weekly: stockOutWeekly,
                monthly: stockOutMonthly,
            },
        };
    }
}


