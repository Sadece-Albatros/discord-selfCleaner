import config from "./config.js";
import CleanerController from "./src/Controller.js";
import Logger from "./src/Logger.js";

if (!config.token) {
  Logger.error("config.js içinde token belirtilmemiş");
  process.exit(1);
}

if (config.targetUserIds.length === 0) {
  Logger.error("config.js içinde targetUserIds dizisi boş");
  process.exit(1);
}

const controller = new CleanerController(config);
controller.run().catch(err => {
  Logger.error("Kritik hata: " + err.message);
  process.exit(1);
});
