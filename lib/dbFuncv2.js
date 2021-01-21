const db = require("../db/index");

function findDataLastMonth() {
  return new Promise((resolve, reject) => {
    try {
      let query = `SELECT
    createdat::DATE AS date,
    MAX(max) AS maxs,
    AVG(avarage) AS avarage,
    COUNT(*) AS count
    FROM hystoricalwinddata
    WHERE createdat >  now() - interval '1 months'
    GROUP BY createdat::DATE
    ORDER BY createdat::DATE;`;

      db.query(query, [], (err, result) => {
        if (err) {
          console.log(err);
          reject(err);
        }

        let formatedResult = result.rows.map((ele) => {
          let created = new Date(ele.date);
          return {
            date: `${created.getFullYear()}-${
              created.getMonth() + 1
            }-${created.getDate()}`,
            maxs: parseInt(ele.maxs),
            avarage: parseFloat(ele.avarage),
            count: parseInt(ele.count),
          };
        });

        resolve(formatedResult);
      });
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
}

async function findDataLastWeek() {
  return new Promise((resolve, reject) => {
    try {
      let query = `SELECT
      createdat::DATE AS date,
      MAX(max) AS maxs,
      AVG(avarage) AS avarage,
      COUNT(*) AS count
      FROM hystoricalwinddata
      WHERE createdat >  now() - interval '6 days'
      GROUP BY createdat::DATE
      ORDER BY createdat::DATE;`;

      db.query(query, [], (err, result) => {
        if (err) {
          console.log(err);
          reject(err);
        }

        let formatedResult = result.rows.map((ele) => {
          let created = new Date(ele.date);
          return {
            date: `${created.getFullYear()}-${
              created.getMonth() + 1
            }-${created.getDate()}`,
            maxs: parseInt(ele.maxs),
            avarage: parseFloat(ele.avarage),
            count: parseInt(ele.count),
          };
        });

        resolve(formatedResult);
      });
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
}

async function findDataLastDay() {
  return new Promise((resolve, reject) => {
    try {
      let query = `SELECT
       *
      FROM hystoricalwinddata
      WHERE createdat >=  now() - interval '2 days'
      `;

      db.query(query, [], (err, result) => {
        if (err) {
          console.log(err);
          reject(err);
        }

        console.log(result.rows);

        let formatedResult = result.rows.map((ele) => {
          return {
            date: `${new Date(ele.createdat).getHours()} : 00`,
            maxs: ele.max,
            avarage: ele.avarage,
          };
        });

        resolve(formatedResult);
      });
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
}

async function findAll() {
  return new Promise((resolve, reject) => {
    try {
      let query = `SELECT
       *
      FROM hystoricalwinddata
      `;

      db.query(query, [], (err, result) => {
        if (err) {
          console.log(err);
          reject(err);
        }
        resolve(result.rows);
      });
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
}

async function insertData(avarage, max) {
  // ... you will write your Prisma Client queries here
  // thses can be zero
  //   if (!avarage || !max) {
  //     throw new Error("pass valid arguments ");
  //     return;
  //   }

  return new Promise((resolve, reject) => {
    try {
      let query =
        "INSERT INTO hystoricalwinddata (avarage, max) VALUES ($1,$2)";

      db.query(query, [avarage, max], (err, result) => {
        if (err) {
          console.log(err);
          reject(err);
        }
        resolve(result.rows);
      });
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
}

module.exports.findAll = findAll;
module.exports.findDataLastWeek = findDataLastWeek;
module.exports.insertData = insertData;
module.exports.findDataLastDay = findDataLastDay;
module.exports.findDataLastMonth = findDataLastMonth;
