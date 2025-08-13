import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function seedRacks() {
  await prisma.rack.createMany({
    data: [
      {
        code: "R001",
        device_id: 1,
      },
      {
        code: "R002",
        device_id: 2,
      },
      {
        code: "R003",
        device_id: 3,
      },
      {
        code: "R004",
        device_id: 4,
      },
      {
        code: "R005",
        device_id: 5,
      },
      {
        code: "R006",
        device_id: 6,
      },
      {
        code: "R007",
        device_id: 7,
      },
    ],
    skipDuplicates: true,
  });
}
