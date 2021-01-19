const express = require("express");
// const bodyParser = require("body-parser");
const cors = require("cors");
const PORT = process.env.PORT || 3001;
const app = express();
app.use(cors());
require('./lib/mqttHandler')

app.get("/", (req, res) => {
  res.json({ message: "anonmeter" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
