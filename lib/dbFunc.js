const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function findData() {
  // ... you will write your Prisma Client queries here
  try {
    const allData = await prisma.hystoricalwinddata.findMany();
    console.log(allData);
    return allData;
  } catch (error) {
    console.log(error);
  } finally {
    await prisma.$disconnect();
  }
}

async function insertData(avarage, max) {
  // ... you will write your Prisma Client queries here

  if (!avarage || !max) {
    throw new Error("pass valid arguments ");
    return;
  }

  try {
    const allData = await prisma.hystoricalwinddata.create({
      data: {
        avarage: avarage,
        max: max,
      },
    });
    return allData;
  } catch (error) {
    console.log(error);
  } finally {
    await prisma.$disconnect();
  }
}

module.exports.findData = findData;
module.exports.insertData = insertData;
