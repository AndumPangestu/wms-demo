import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function seedAreas() {
    await prisma.machineArea.createMany({
        data: [
            {
                "name": "MELTING"
            },
            {
                "name": "PAINTING"
            },
            {
                "name": "MACHINING"
            },
            {
                "name": "CASTING"
            },
            {
                "name": "LP"
            },
            {
                "name": "GENERAL"
            },
            {
                "name": "HT"
            },
            {
                "name": "2ND MACHINING"
            },
            {
                "name": "UTILITY"
            }
        ],
        skipDuplicates: true
    });
}
