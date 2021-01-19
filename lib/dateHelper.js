const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function findStatsLastWeek() {
  // ... you will write your Prisma Client queries here

  let query = `SELECT
    createdat::DATE AS date,
    MAX(max) AS maxspeed,
    AVG(avarage) AS avaragespeed
    FROM hystoricalwinddata
    WHERE createdat >  now() - interval '7 days'
    GROUP BY createdat::DATE
    ORDER BY createdat::DATE;`;

  // mydate > now() - interval '1 year'

  const result = await prisma.$queryRaw(query);
  console.log(result);
}

findStatsLastWeek();
//   module.exports.findAll = findAll;
