const { Pool } = require("pg");
const connectionString =
  process.env.NODE_ENV === "production"
    ? process.env.DBURL
    : "postgresql://anemometer:123@localhost:5432/anemometer?schema=public"; //require("../config/config").DBURL; //'postgresql://dbuser:secretpassword@database.server.com:3211/mydb'

const pool = new Pool({
  connectionString: connectionString,
});

module.exports = {
  query: (text, params, callback) => {
    const start = Date.now();
    return pool.query(text, params, (err, res) => {
      const duration = Date.now() - start;

      console.log("executed query", {
        text,
        duration,
        top2rows: res? res.rows.slice(0, 2) || []:[],
      });
      callback(err, res);
    });
  },
};
