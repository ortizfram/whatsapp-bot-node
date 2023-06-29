const { Client, RemoteAuth } = require("whatsapp-web.js");
const mongoose = require("mongoose");
const qrcode = require("qrcode-terminal");
const { MongoStore } = require("wwebjs-mongo");
const { MessageMedia } = require("whatsapp-web.js");
require("dotenv").config();

const Happy = MessageMedia.fromFilePath(`${__dirname}/source/happy.png`);

/**
 * Load session data
 * */
mongoose.connect(process.env.MONGODB_URI).then(() => {
  const store = new MongoStore({ mongoose: mongoose });
  const client = new Client({
    authStrategy: new RemoteAuth({
      store: store,
      backupSyncIntervalMs: 300000,
    }),
  });

  client.on("qr", (qr) => {
    qrcode.generate(qr, { small: true });
  });

  client.on("ready", () => {
    console.log("Client is ready!");
  });

  client.on("remote_session_saved", () => {
    console.log("Session saved");
  });

  client.on("message", (message) => {
    client.on("message", async (message) => {
      if (message.hasMedia) {
        const media = await message.downloadMedia();
        console.log(media);
        return;
      }
    });

    if (message.body === "hola") {
      return client.sendMessage(message.from, message.body);
    }
    if (message.body === "como estas") {
      return client.sendMessage(message.from, "bien y tu?");
    }
    if (message.body === "happy") {
      return client.sendMessage(message.from, Happy, {
        caption: "Don't worry be happy",
      });
    }

    return client.sendMessage(message.from, "Opcion no disponible");
  });

  client.initialize();
});

/**
 * DB connection check
 */
const connection = mongoose.connection;

connection.once("open", () => {
  console.log("**DB conectada correctamente");
});
