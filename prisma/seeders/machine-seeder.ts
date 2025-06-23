import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function seedMachines() {
    await prisma.machine.createMany({
        data: [
            {
                "code": "BM"
            },
            {
                "code": "MF"
            },
            {
                "code": "DE"
            },
            {
                "code": "PB"
            },
            {
                "code": "DR"
            },
            {
                "code": "LF"
            },
            {
                "code": "GC"
            },
            {
                "code": "PH"
            },
            {
                "code": "DF"
            },
            {
                "code": "WO"
            },
            {
                "code": "XR"
            },
            {
                "code": "DC"
            },
            {
                "code": "LA"
            },
            {
                "code": "RO"
            },
            {
                "code": "PP"
            },
            {
                "code": "HF"
            },
            {
                "code": "SB"
            },
            {
                "code": "RT"
            },
            {
                "code": "LT"
            },
            {
                "code": "TL"
            },
            {
                "code": "WB"
            },
            {
                "code": "AP"
            },
            {
                "code": "LP"
            },
            {
                "code": "BO"
            },
            {
                "code": "PZ"
            },
            {
                "code": "WT"
            },
            {
                "code": "PN"
            },
            {
                "code": "EC"
            },
            {
                "code": "GN"
            },
            {
                "code": "CC"
            },
            {
                "code": "ED"
            },
            {
                "code": "pp"
            },
            {
                "code": "WL"
            },
            {
                "code": "AR"
            },
            {
                "code": "RO XR"
            },
            {
                "code": "SS"
            },
            {
                "code": "ZP"
            },
            {
                "code": "LT GL"
            },
            {
                "code": "VD"
            },
            {
                "code": "LT HO"
            },
            {
                "code": "CH"
            },
            {
                "code": "TT"
            },
            {
                "code": "GENERAL"
            },
        ],
        skipDuplicates: true
    });
}
