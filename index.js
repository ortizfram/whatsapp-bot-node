const { Client, RemoteAuth } = require("whatsapp-web.js");
const mongoose = require("mongoose");
const qrcode = require("qrcode-terminal");
const { MongoStore } = require("wwebjs-mongo");
require("dotenv").config();

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
    if (message.body === "hola") {
      return client.sendMessage(message.from, message.body);
    }
    if (message.body === "como estas") {
      return client.sendMessage(message.from, "bien y tu?");
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
