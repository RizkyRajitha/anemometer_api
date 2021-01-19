const mqtt = require("mqtt");
const schedule = require("node-schedule");

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
let j = schedule.scheduleJob(cronTime, function () {
  console.log("The answer to life, the universe, and everything!");

  console.log("AVG :" + avarage);
  console.log("MaX :" + max);
  console.log("resetting.....");
  // write to data base
  avarage = 0;
  max = 0;
  i = 0;
});

client.on("error", (error) => console.log(error));
console.log(client.connected);
