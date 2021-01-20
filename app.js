const express = require("express");
// const bodyParser = require("body-parser");
const cors = require("cors");
const PORT = process.env.PORT || 3001;
const app = express();
app.use(cors());

require("./lib/mqttHandler");
const db = require("./lib/dbFunc");

app.get("/getdatalastday", async (req, res) => {
  try {
    let data = await db.findDataLastDay();
    console.log(data);
    res.json({ data });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

app.get("/getdatalastweek", async (req, res) => {
  try {
    let data = await db.findDataLastWeek();
    console.log(data);
    res.json({ data });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

app.get("/getdatalastmonth", async (req, res) => {
  try {
    let data = await db.findDataLastMonth();
    console.log(data);
    res.json({ data });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

app.get("/getall", async (req, res) => {
  try {
    let data = await db.findAll();
    console.log(data);
    res.json({ data });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

console.log(new Date());

app.get("/insert", async (req, res) => {
  try {
    let data = await db.insertData(
      Math.floor((Math.random() * 100) % 50),
      Math.floor((Math.random() * 100) % 50)
    );
    console.log(data);
    res.json({ data });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

app.get("/", (req, res) => {
  res.json({ message: "anonmeter" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
