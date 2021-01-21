const mqtt = require("mqtt");
const schedule = require("node-schedule");
const db = require("./dbFuncv2");
const fs = require("fs");

let client = mqtt.connect("mqtt://broker.mqttdashboard.com", {
  port: 1883,
  path: "/mqtt",
});

let avarage = 0;
let max = 0;
let i = 0;

client.on("connect", () => {
  console.log("connected");
  client.subscribe("ultralegendpro", function (err) {
    if (!err) {
      console.log("successfully susbscribed to topic");
    }
    console.log(err);
  });
});

client.on("message", (topic, message) => {
  let msg = message.toString();
  console.log(msg);
  let val = msg.split(";");
  let speedKmph = parseFloat(val[0]);
  console.log(speedKmph);

  let date = new Date();
  if (speedKmph > max) {
    max = speedKmph;
  }
  i = i + 1;
  avarage = (speedKmph + avarage * (i - 1)) / i;
  console.log(avarage);
  console.log(max);
});

let cronTime = `0 * * * *`;
let j = schedule.scheduleJob(cronTime, async function () {
  console.log("The answer to life, the universe, and everything!");

  console.log("AVG :" + avarage);
  console.log("MaX :" + max);
  console.log("Itarations :" + i);

  // write to data base
  try {
    let data = await db.insertData(avarage, max);
    console.log(data);
  } catch (error) {
    console.log(error);
    fs.appendFileSync(
      "log.txt",
      `\n${new Date().toISOString()} ; databaseError ; ${error.message}`
    );
  }

  // reset values after one itaration
  console.log("resetting.....");
  avarage = 0;
  max = 0;
  i = 0;
});

client.on("error", (error) => {
  console.log(error);
  fs.appendFileSync(
    "log.txt",
    `\n${new Date().toISOString()} ; mqttError ; ${error.message}`
  );
});
console.log(client.connected);
