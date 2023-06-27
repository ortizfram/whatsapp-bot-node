const { Client, NoAuth } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");

const client = new Client({
  authStrategy: new NoAuth(),
});

client.on("qr", (qr) => {
  // console.log('QR RECEIVED', qr);
  qrcode.generate(qr, { small: true });
});

client.on("ready", () => {
  console.log("Client is ready!");
});

client.on("message", (message) => {
  if (message.body === "hola") {
    return client.sendMessage(message.from, message.body);
  }
  if (message.body === "como estas") {
    return client.sendMessage(message.from, "bien y tu?");
  }

  return client.sendMessage(message.from, "Opcion no disponible");
});

client.initialize();
