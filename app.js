const fs = require("fs");

const { Client } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");

const SESSION_FILE_PATH = "./session.json";
let client;
let sessionData;

const withSession = () => {};

/**
 * This function GENERATES QRCODE ***
 */
const withOutSession = () => {
  console.log("No tenemos session guardada");
  client = new Client();
  client.on("qr", (qr) => {
    console.log(qr);
    qrcode.generate(qr, { small: true });
  });

  client.on("authenticated", (session) => {
    // Guardamos credenciales de session para luego
    sessionData = session;
    fs.writeFile(SESSION_FILE_PATH, JSON.stringify(session), (err) => {
      if (err) {
        console.log(err);
      }
    });
  });

  client.initialize();
};

/** */
fs.existsSync(SESSION_FILE_PATH) ? withSession() : withOutSession();
