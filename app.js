const qrcode = require("qrcode-terminal");

const { Client } = require("whatsapp-web.js");

/**  === GENERATE QR CODE FOR SESSION ===
 *  Once it's generated, and scanned, you can comment it
 */

// client.on("qr", (qr) => {
//   qrcode.generate(qr, { small: true });
// });

// client.on("ready", () => {
//   console.log("Client is ready!");
// });

// client.initialize();

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
    fs.writeFile(SESSION_FILE_PATH, JSON.stringify(session), function (err) {
      if (err) {
        console.log(err);
      }
    });
  });
};
