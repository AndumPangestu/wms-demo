import { KanbanResponse, CreateKanbanRequest, UpdateKanbanRequest, toKanbanResponse, SearchKanbanRequest, KanbanRawEntry, CreateKanbanImportRequest } from "../model/kanban-model";
import { Validation } from "../validation/validation";
import { KanbanValidation } from "../validation/kanban-validation";
import { prismaClient } from "../application/database";
import { logger } from "../application/logging";
import { ResponseError } from "../error/response-error";
import { Pageable } from "../model/page";
import xlsx from 'xlsx';
import { Workbook, BorderStyle } from "exceljs"
import path from 'path';
import { LampService } from "./lamp-service";



export class KanbanService {

    static async createFromRequest(request: CreateKanbanRequest): Promise<KanbanResponse> {
        const createRequest = Validation.validate(KanbanValidation.CREATE, request);

        // Validasi unique: part_code
        const isCodeExist = await prismaClient.kanban.findUnique({
            where: { code: createRequest.code }
        });
        if (isCodeExist) {
            throw new ResponseError(400, "Code already exist");
        }

        // Validasi foreign key: rack_id
        const isRackExist = await prismaClient.rack.findUnique({
            where: { id: createRequest.rack_id }
        });
        if (!isRackExist) {
            throw new ResponseError(404, "Rack not found");
        }


        // Validasi foreign key: machine_area_id
        if (createRequest.machine_area_id) {
            const isMachineAreaExist = await prismaClient.machineArea.findUnique({
                where: { id: createRequest.machine_area_id }
            });
            if (!isMachineAreaExist) {
                throw new ResponseError(404, "Machine Area not found");
            }
        }

        // Validasi foreign key: machine_id
        if (createRequest.machine_id) {
            const isMachineExist = await prismaClient.machine.findUnique({
                where: { id: createRequest.machine_id }
            });
            if (!isMachineExist) {
                throw new ResponseError(404, "Machine not found");
            }
        }



        const Kanban = await prismaClient.kanban.create({
            data: createRequest,
            include: {
                rack: true,
                machine_area: true,
                machine: true,
                supplier: true,
                maker: true

            }
        });

        return toKanbanResponse(Kanban);
    }

    static async create(filePath: string) {

        const workbook: xlsx.WorkBook = xlsx.readFile(filePath);

        const sheet: xlsx.WorkSheet = workbook.Sheets["Sheet1"];

        if (!sheet) {
            logger.error("MASTER MATERIAL sheet not found");
            throw new Error("MASTER MATERIAL sheet not found");
        }

        const data: any[][] = xlsx.utils.sheet_to_json(sheet, {
            header: 1,
        });

        const headers: string[] = data[3] as string[];

        const importantHeaders: string[] = [
            "CODE JS SYSTEM",
            "AREA",
            "CODE RACK",
            "MESIN",
            "DESCRIPTION",
            "SPECIFICATION",
            "MAKER",
            "CURRENCY",
            "PRICE",
            "UoM",
            "Safety Stock",
            "Minimal Stock",
            "Maximal Stock",
            "Lead Time",
            "Order Point",
            "Rank"
        ];

        const missingHeaders: string[] = importantHeaders.filter((h) => !headers.includes(h));
        if (missingHeaders.length > 0) {
            logger.error(`Missing important headers: ${missingHeaders.join(", ")}`);
            throw new Error(`Missing important headers: ${missingHeaders.join(", ")}`);
        }

        const kanbans: KanbanRawEntry[] = [];

        for (let i = 4; i < data.length; i++) {
            // if (data[i].length !== headers.length) {                
            //     continue
            // };

            const kanbanTemp: KanbanRawEntry = {};

            for (let j = 0; j < headers.length; j++) {
                kanbanTemp[headers[j]] = data[i][j];
            }

            kanbans.push(kanbanTemp);
        }


        const parseNumber = (val: string | undefined): number | null =>
            val && val !== "-" ? Number(val) : null;

        const parseString = (val: string | undefined): string | null =>
            val && val !== "-" ? val.toString() : null;

        const isValidProductCode = (code: string): boolean => {
            const prefix = code.split("-")[0];
            return prefix === "EA";
        };


        const makerNames = Array.from(new Set(
            kanbans
                .map((entry) => entry.MAKER === "" || entry.MAKER === null || entry.MAKER === undefined || entry.MAKER === "-" ? null : parseString(entry.MAKER))
                .filter((s): s is string => !!s)
        ));

        const existingMakers = await prismaClient.maker.findMany({
            where: { name: { in: makerNames } },
            select: { id: true, name: true }
        });

        const existingMakerMap = new Map(existingMakers.map(s => [s.name, s.id]));

        const newMakerNames = makerNames.filter(name => !existingMakerMap.has(name));

        const newMakers = await prismaClient.$transaction(async (tx) => {
            return await tx.maker.createMany({
                data: newMakerNames.map(name => ({ name })),
                skipDuplicates: true
            }).then(() =>
                tx.maker.findMany({
                    where: { name: { in: newMakerNames } },
                    select: { id: true, name: true }
                })
            );
        });

        newMakers.forEach(s => existingMakerMap.set(s.name, s.id));





        const areaNames = Array.from(new Set(
            kanbans
                .map((entry) => entry.AREA === "" || entry.AREA === null || entry.AREA === undefined || entry.AREA === "-" ? null : parseString(entry.AREA))
                .filter((s): s is string => !!s)
        ));

        const existingAreas = await prismaClient.machineArea.findMany({
            where: { name: { in: areaNames } },
            select: { id: true, name: true }
        });

        const existingAreaMap = new Map(existingAreas.map(s => [s.name, s.id]));

        const newAreaNames = areaNames.filter(name => !existingAreaMap.has(name));

        const newAreas = await prismaClient.$transaction(async (tx) => {
            return await tx.machineArea.createMany({
                data: newAreaNames.map(name => ({ name })),
                skipDuplicates: true
            }).then(() =>
                tx.machineArea.findMany({
                    where: { name: { in: newAreaNames } },
                    select: { id: true, name: true }
                })
            );
        });

        newAreas.forEach(s => existingAreaMap.set(s.name, s.id));





        const machineNames = Array.from(new Set(
            kanbans
                .map((entry) => entry.MESIN === "" || entry.MESIN === null || entry.MESIN === undefined || entry.MESIN === "-" ? null : parseString(entry.MESIN))
                .filter((s): s is string => !!s)
        ));

        const existingMachines = await prismaClient.machine.findMany({
            where: { code: { in: machineNames } },
            select: { id: true, code: true }
        });

        const existingMachineMap = new Map(existingMachines.map(s => [s.code, s.id]));

        const newMachineNames = machineNames.filter(code => !existingMachineMap.has(code));

        const newMachines = await prismaClient.$transaction(async (tx) => {
            return await tx.machine.createMany({
                data: newMachineNames.map(code => ({ code })),
                skipDuplicates: true
            }).then(() =>
                tx.machine.findMany({
                    where: { code: { in: newMachineNames } },
                    select: { id: true, code: true }
                })
            );
        });

        newMachines.forEach(s => existingMachineMap.set(s.code, s.id));


        const rackNames = Array.from(new Set(
            kanbans
                .map((entry) => entry["CODE RACK"] === "" || entry["CODE RACK"] === null || entry["CODE RACK"] === undefined || entry["CODE RACK"] === "-" ? null : parseString(entry["CODE RACK"]))
                .filter((s): s is string => !!s)
        ));

        const existingRacks = await prismaClient.rack.findMany({
            where: { code: { in: rackNames } },
            select: { id: true, code: true }
        });

        const existingRackMap = new Map(existingRacks.map(s => [s.code, s.id]));

        const newRackNames = rackNames.filter(code => !existingRackMap.has(code));

        const newRacks = await prismaClient.$transaction(async (tx) => {
            return await tx.rack.createMany({
                data: newRackNames.map(code => ({ code })),
                skipDuplicates: true
            }).then(() =>
                tx.rack.findMany({
                    where: { code: { in: newRackNames } },
                    select: { id: true, code: true }
                })
            );
        });

        newRacks.forEach(s => existingRackMap.set(s.code, s.id));

        const kanbanFormattedResult: CreateKanbanImportRequest[] = kanbans
            .filter((entry: KanbanRawEntry) => entry["CODE JS SYSTEM"] !== undefined && entry["CODE JS SYSTEM"] !== null && entry["CODE JS SYSTEM"] !== "" && isValidProductCode(entry["CODE JS SYSTEM"]))
            .map((entry: KanbanRawEntry) => {

                const makerName = entry.MAKER === "" || entry.MAKER === null || entry.MAKER === undefined || entry.MAKER === "-" ? null : parseString(entry.MAKER);
                const maker_id = makerName ? existingMakerMap.get(makerName) : undefined;


                const areaName = entry.AREA === "" || entry.AREA === null || entry.AREA === undefined || entry.AREA === "-" ? null : parseString(entry.AREA);
                const area_id = areaName ? existingAreaMap.get(areaName) : undefined;


                const machineName = entry.MESIN === "" || entry.MESIN === null || entry.MESIN === undefined || entry.MESIN === "-" ? null : parseString(entry.MESIN);
                const machine_id = machineName ? existingMachineMap.get(machineName) : undefined;


                const rackName = entry["CODE RACK"] === "" || entry["CODE RACK"] === null || entry["CODE RACK"] === undefined || entry["CODE RACK"] === "-" ? null : parseString(entry["CODE RACK"]);
                const rack_id = rackName ? existingRackMap.get(rackName) : undefined;

                return {
                    code: entry["CODE JS SYSTEM"],
                    uom: parseString(entry.UoM),
                    min_quantity: parseNumber(entry["Minimal Stock"]),
                    max_quantity: parseNumber(entry["Maximal Stock"]),
                    lead_time: parseNumber(entry["Lead Time"]),
                    description: parseString(entry.DESCRIPTION),
                    specification: parseString(entry.SPECIFICATION),
                    maker_id: maker_id,
                    area_id: area_id,
                    machine_id: machine_id,
                    machine_area_id: area_id,
                    rack_id: rack_id,
                    safety_stock: parseNumber(entry["Safety Stock"]),
                    order_point: parseNumber(entry["Order Point"]),
                    rank: parseString(entry.Rank),
                    currency: parseString(entry.CURRENCY),
                    price: parseNumber(entry.PRICE),
                }
            });


        try {
            // Validasi data dari input
            const createRequest = Validation.validate(KanbanValidation.CREATE_MULTIPLE, kanbanFormattedResult);

            const createConnect = (field: string, id: any) => (id ? { [field]: { connect: { id } } } : {});

            const createKanbanData = (data: any) => {
                const {
                    rack_id,
                    maker_id,
                    machine_id,
                    machine_area_id,
                    supplier_id,
                    ...rest
                } = data;

                return {
                    ...rest,
                    ...createConnect("supplier", supplier_id),
                    ...createConnect("rack", rack_id),
                    ...createConnect("maker", maker_id),
                    ...createConnect("machine", machine_id),
                    ...createConnect("machine_area", machine_area_id),
                };
            };

            const chunkSize = 50;

            // Bagi data menjadi chunk untuk mencegah beban berat dalam satu transaksi
            for (let i = 0; i < createRequest.length; i += chunkSize) {
                const chunk = createRequest.slice(i, i + chunkSize);

                await prismaClient.$transaction(async (tx) => {
                    for (const item of chunk) {
                        const kanbanData = createKanbanData(item);
                        await tx.kanban.upsert({
                            where: { code: item.code },
                            update: kanbanData, // update jika code sudah ada
                            create: kanbanData, // insert jika belum ada
                        });
                        logger.info(`Kanban with code ${item.code} upserted`);
                    }
                });
            }

            return true;

        } catch (error) {
            logger.error("Error while upserting kanban master data: " + error);
            throw new ResponseError(400, "Invalid request");
        }


    }


    static async update(id: number, request: UpdateKanbanRequest): Promise<KanbanResponse> {

        if (isNaN(id)) {
            throw new ResponseError(400, "Invalid id");
        }

        const idISValid = await prismaClient.kanban.findUnique({
            where: {
                id: id
            }
        });

        if (!idISValid) {
            throw new ResponseError(400, "Kanban not found");
        }

        const updateRequest = Validation.validate(KanbanValidation.UPDATE, request);

        const isPartExist = await prismaClient.kanban.findFirst({
            where: {
                code: updateRequest.code,
                id: {
                    not: id
                }
            }
        });

        if (isPartExist) {
            throw new ResponseError(400, "Code already exists");
        }

        // Validasi foreign key: rack_id
        const isRackExist = await prismaClient.rack.findUnique({
            where: { id: updateRequest.rack_id }
        });
        if (!isRackExist) {
            throw new ResponseError(404, "Rack not found");
        }

        if (updateRequest.machine_area_id) {
            const isMachineAreaExist = await prismaClient.machineArea.findUnique({
                where: { id: updateRequest.machine_area_id }
            });
            if (!isMachineAreaExist) {
                throw new ResponseError(404, "Machine Area not found");
            }
        }
        if (updateRequest.machine_id) {
            const isMachineExist = await prismaClient.machine.findUnique({
                where: { id: updateRequest.machine_id }
            });
            if (!isMachineExist) {
                throw new ResponseError(404, "Machine not found");
            }
        }

        // Lakukan update dengan relasi menggunakan `connect`
        const kanban = await prismaClient.kanban.update({
            where: {
                id: id,
            },
            data: {
                code: updateRequest.code,
                min_quantity: updateRequest.min_quantity,
                max_quantity: updateRequest.max_quantity,
                description: updateRequest.description,
                specification: updateRequest.specification,
                balance: updateRequest.balance,
                uom: updateRequest.uom,
                lead_time: updateRequest.lead_time,
                safety_stock: updateRequest.safety_stock,
                order_point: updateRequest.order_point,
                price: updateRequest.price,
                currency: updateRequest.currency,
                rank: updateRequest.rank,
                rack: {
                    connect: { id: updateRequest.rack_id },
                },
                machine_area: updateRequest.machine_area_id !== null
                    ? { connect: { id: updateRequest.machine_area_id } }
                    : undefined,
                machine: updateRequest.machine_id
                    ? { connect: { id: updateRequest.machine_id } }
                    : undefined,
                supplier: updateRequest.supplier_id
                    ? { connect: { id: updateRequest.supplier_id } }
                    : undefined,
                maker: updateRequest.maker_id
                    ? { connect: { id: updateRequest.maker_id } }
                    : undefined,
            },
            include: {
                rack: true,
                machine_area: true,
                machine: true,
                maker: true,
                supplier: true,
            },
        });

        return toKanbanResponse(kanban);
    }



    static async get(request: SearchKanbanRequest): Promise<Pageable<KanbanResponse>> {

        const searchRequest = Validation.validate(KanbanValidation.SEARCH, request);

        const filters: any[] = [];

        if (searchRequest.keyword) {
            const keyword = searchRequest.keyword.replace(/\\/g, '\\\\');
            filters.push({
                OR: [
                    { code: { contains: keyword } },
                    { description: { contains: keyword } },
                    { specification: { contains: keyword } }
                ]
            });
        }

        if (searchRequest.completed_status) {

            if (searchRequest.completed_status.toLocaleLowerCase() === "completed") {
                filters.push({
                    AND: [
                        { machine_area_id: { not: null } },
                        { machine_id: { not: null } },
                        { rack_id: { not: null } },
                        { maker_id: { not: null } },
                        { description: { not: null } },
                        { specification: { not: null } },
                        { currency: { not: null } },
                        { price: { not: null } },
                        { uom: { not: null } },
                        { safety_stock: { not: null } },
                        { order_point: { not: null } },
                        { min_quantity: { not: null } },
                        { max_quantity: { not: null } },
                        { lead_time: { not: null } },
                        { rank: { not: null } }
                    ]
                });
            } else if (searchRequest.completed_status.toLocaleLowerCase() === "uncompleted") {
                filters.push({
                    OR: [
                        { machine_area_id: null },
                        { machine_id: null },
                        { rack_id: null },
                        { maker_id: null },
                        { description: null },
                        { specification: null },
                        { currency: null },
                        { price: null },
                        { uom: null },
                        { safety_stock: null },
                        { order_point: null },
                        { min_quantity: null },
                        { max_quantity: null },
                        { lead_time: null },
                        { rank: null }
                    ]
                });
            }

        }

        if (searchRequest.stock_status) {
            if (searchRequest.stock_status.toLocaleLowerCase() === "overstock") {
                filters.push({
                    balance: {
                        gt: prismaClient.kanban.fields.max_quantity
                    }
                });
            } else if (searchRequest.stock_status.toLocaleLowerCase() === "understock") {
                filters.push({
                    balance: {
                        lt: prismaClient.kanban.fields.min_quantity
                    }
                });
            } else if (searchRequest.stock_status.toLocaleLowerCase() === "normal") {
                filters.push({
                    balance: {
                        gte: prismaClient.kanban.fields.min_quantity,
                        lte: prismaClient.kanban.fields.max_quantity
                    }
                });
            }

        }


        if (searchRequest.rack_id) {
            filters.push({
                rack_id: searchRequest.rack_id,
            });
        }


        if (searchRequest.machine_area_id) {
            filters.push({
                machine_area_id: searchRequest.machine_area_id,
            });
        }

        if (searchRequest.machine_id) {
            filters.push({
                machine_id: searchRequest.machine_id,
            });
        }

        const whereClause = filters.length > 0 ? { AND: filters } : {};

        // Default pagination values if not provided
        const page = searchRequest.page || 1;
        const limit = searchRequest.limit || 10;

        const skip = (page - 1) * limit;

        const [kanbans, total] = await Promise.all([
            prismaClient.kanban.findMany({
                where: whereClause,
                ...(searchRequest.paginate ? { take: limit, skip } : {}),
                include: {
                    rack: true,
                    machine_area: true,
                    machine: true,
                    supplier: true,
                    maker: true
                }
            }),
            prismaClient.kanban.count({
                where: whereClause,
            })
        ]);



        const pagination = searchRequest.paginate
            ? {
                curr_page: page,
                total_page: Math.ceil(total / limit),
                limit: limit,
                total: total
            }
            : undefined;



        return {
            data: kanbans.map(toKanbanResponse),
            ...(pagination ? { pagination } : {})

        };
    }

    static async show(identifier: number | string, isTurnOnLamp: boolean): Promise<KanbanResponse> {
        let kanban;

        if (typeof identifier === "number" || (!isNaN(Number(identifier)) && Number(identifier) > 0)) {
            kanban = await prismaClient.kanban.findUnique({
                where: {
                    id: Number(identifier),
                },
                include: {
                    rack: true,
                    machine_area: true,
                    machine: true,
                    supplier: true,
                    maker: true

                }
            });
        } else if (typeof identifier === "string") {
            kanban = await prismaClient.kanban.findUnique({
                where: {
                    code: identifier,
                },
                include: {
                    rack: true,
                    machine_area: true,
                    machine: true,
                    supplier: true,
                    maker: true

                }
            });
        } else {
            throw new ResponseError(400, "Invalid identifier");
        }

        if (!kanban) {
            throw new ResponseError(404, "Kanban not found");
        }

        if (isTurnOnLamp) {
            if (kanban.rack_id) {
                const rack = await prismaClient.rack.findUnique({
                    where: {
                        id: kanban.rack_id
                    }, select: {
                        device_id: true
                    }
                })

                if (rack?.device_id) {
                    await LampService.turnOnLamp(rack.device_id);
                }
            }
        }

        return toKanbanResponse(kanban);
    }



    static async remove(id: number) {


        if (isNaN(id)) {
            throw new ResponseError(400, "Invalid id");
        }

        const idISValid = await prismaClient.kanban.findUnique({
            where: {
                id: id
            }
        });

        if (!idISValid) {
            throw new ResponseError(404, "Kanban not found");
        }

        await prismaClient.kanban.delete({
            where: {
                id: id
            }
        });

    }


    static async exportUncompletedKanbanToExcel(): Promise<any> {


        const unCompletedKanbans = await prismaClient.kanban.findMany({
            where: {
                OR: [
                    { machine_area_id: null },
                    { machine_id: null },
                    { rack_id: null },
                    { maker_id: null },
                    { description: null },
                    { specification: null },
                    { currency: null },
                    { price: null },
                    { uom: null },
                    { safety_stock: null },
                    { order_point: null },
                    { min_quantity: null },
                    { max_quantity: null },
                    { lead_time: null },
                    { rank: null }
                ]
            },
            include: {
                rack: true,
                machine_area: true,
                machine: true,
                maker: true
            }
        });



        const workbook = new Workbook()
        const templatePath = path.resolve(__dirname, "../../template_file/MasterExportTemplate.xlsx")

        await workbook.xlsx.readFile(templatePath)
        const worksheet = workbook.getWorksheet(1)
        if (!worksheet) throw new Error("Worksheet tidak ditemukan.")

        const blackBorder = {
            top: { style: 'thin' as BorderStyle, color: { argb: 'FF000000' } },
            left: { style: 'thin' as BorderStyle, color: { argb: 'FF000000' } },
            bottom: { style: 'thin' as BorderStyle, color: { argb: 'FF000000' } },
            right: { style: 'thin' as BorderStyle, color: { argb: 'FF000000' } }
        };


        let rowIndex = 5;

        for (const kanban of unCompletedKanbans) {

            const row = worksheet.getRow(rowIndex++);

            const cells = [
                kanban.code,
                kanban.machine_area?.name || null,
                kanban.machine?.code || null,
                kanban.rack?.code || null,
                kanban.description,
                kanban.specification,
                kanban.maker?.name || null,
                kanban.currency,
                kanban.price,
                kanban.uom,
                kanban.safety_stock,
                kanban.min_quantity,
                kanban.order_point,
                kanban.max_quantity,
                kanban.lead_time,
                kanban.rank
            ];

            cells.forEach((value, index) => {
                const cell = row.getCell(index + 1);

                cell.border = blackBorder;
                const prevStyle = { ...cell.style };

                if (value === null || value === undefined || value === '') {
                    cell.value = '';
                    cell.style = {
                        ...prevStyle,
                        fill: {
                            type: 'pattern',
                            pattern: 'solid',
                            fgColor: { argb: 'FFFFFF00' } // kuning (alpha FF)
                        }
                    };
                } else {
                    cell.value = value;
                    cell.style = prevStyle;
                }
            });

            row.commit();
        }
        // await workbook.xlsx.writeFile(path.resolve(__dirname, "../../uncompleted_kanban_export.xlsx"))
        const buffer = await workbook.xlsx.writeBuffer();
        return buffer;
    }


}


