const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function findDataLastMonth() {
  // ... you will write your Prisma Client queries here
  var lastTime = new Date();
  lastTime.setMonth(lastTime.getMonth() - 1);
  try {
    let query = `SELECT
    createdat::DATE AS date,
    MAX(max) AS maxspeed,
    AVG(avarage) AS avaragespeed
    FROM hystoricalwinddata
    WHERE createdat >  now() - interval '1 months'
    GROUP BY createdat::DATE
    ORDER BY createdat::DATE;`;

    const result = await prisma.$queryRaw(query);
    console.log(result);
    return result;
  } catch (error) {
    console.log(error);
  } finally {
    await prisma.$disconnect();
  }
}

async function findDataLastWeek() {
  // ... you will write your Prisma Client queries here
  try {
    let query = `SELECT
    createdat::DATE AS date,
    MAX(max) AS maxspeed,
    AVG(avarage) AS avaragespeed,
    COUNT(*) AS count
    FROM hystoricalwinddata
    WHERE createdat >  now() - interval '7 days'
    GROUP BY createdat::DATE
    ORDER BY createdat::DATE;`;

    const result = await prisma.$queryRaw(query);
    return result;
  } catch (error) {
    console.log(error);
  } finally {
    await prisma.$disconnect();
  }
}

async function findDataLastDay() {
  // ... you will write your Prisma Client queries here
  var lastTime = new Date();
  lastTime.setDate(lastTime.getDate() - 1);
  console.log(lastTime);
  //   let now = new Date();
  try {
    const allData = await prisma.hystoricalwinddata.findMany({
      where: {
        createdAt: {
          gte: lastTime,
          // lte: now,
        },
      },
    });
    console.log(allData);
    return allData;
  } catch (error) {
    console.log(error);
  } finally {
    await prisma.$disconnect();
  }
}

async function findAll() {
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

//   if (!avarage || !max) {
//     throw new Error("pass valid arguments ");
//     return;
//   }

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

module.exports.findAll = findAll;
module.exports.findDataLastWeek = findDataLastWeek;
module.exports.insertData = insertData;
module.exports.findDataLastDay = findDataLastDay;
module.exports.findDataLastMonth = findDataLastMonth;
