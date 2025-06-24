import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import bcrypt from 'bcryptjs';
import { seedAreas } from './seeders/area-seeder';
import { seedMachines } from './seeders/machine-seeder';
import { seedRacks } from './seeders/rack-seeder';
import { seedKanbans1 } from './seeders/kanban-1-seeder';
import { seedKanbans2 } from './seeders/kanban-2-seeder';
import { seedKanbans3 } from './seeders/kanban-3-seeder';
import { seedKanbans4 } from './seeders/kanban-4-seeder';
import { seedSuppliers } from './seeders/supplier-seeder';
import { seedMakers } from './seeders/maker-seeder';


async function main() {
    await prisma.user.createMany({
        data: [
            {
                username: 'admin',
                name: 'Admin',
                role: 'admin',
                password: await bcrypt.hash('123123', 10),
            },
            {
                username: 'john',
                name: 'John',
                role: 'operator',
                password: await bcrypt.hash('123123', 10),
            },
            {
                username: 'asep',
                name: 'Asep',
                role: 'operator',
                password: await bcrypt.hash('123123', 10),
            },
            {
                username: 'lennon',
                name: 'Lennon',
                role: 'pic',
                password: await bcrypt.hash('123123', 10),
            },

        ],
    });


    await seedSuppliers();
    await seedMakers();
    await seedAreas();
    await seedMachines();
    await seedRacks();
    await seedKanbans1();
    await seedKanbans2();
    await seedKanbans3();
    await seedKanbans4();

}




main()
    .catch((e) => {
        console.error(e.message);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
