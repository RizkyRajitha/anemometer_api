const express = require("express");
// const bodyParser = require("body-parser");
const cors = require("cors");
const PORT = process.env.PORT || 3001;
const app = express();
app.use(cors());

require("./lib/mqttHandler");
const db = require("./lib/dbFunc");

app.get("/", (req, res) => {
  res.json({ message: "anonmeter" });
});

app.get("/all", async (req, res) => {
  let data = await db.findData();
  console.log(data);
  res.json({ data });
});

app.get("/insert", async (req, res) => {
  try {
    let data = await db.insertData(
      String(Math.floor((Math.random() * 100) % 50)),
      String(Math.floor((Math.random() * 100) % 50))
    );
    console.log(data);
    res.json({ data });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
