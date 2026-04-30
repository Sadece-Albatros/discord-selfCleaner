import pLimit from "p-limit";
import Logger from "./Logger.js";
import DiscordClient from "./Client.js";
import MessageDeleter from "./Deleter.js";

export default class CleanerController {
  constructor(config) {
    this.config = config;
    this.client = new DiscordClient(config.token);
    this.concurrency = config.concurrency;
  }

  async run() {
    try {
      Logger.info("Discord'a bağlanılıyor...");
      await this.client.connect();

      const deleter = new MessageDeleter(this.client, this.config);
      const limit = pLimit(this.concurrency);

      Logger.info(`${this.config.targetUserIds.length} kullanıcı için işlem başlatılıyor...`);
      console.log();

      const tasks = this.config.targetUserIds.map(id =>
        limit(() => deleter.deleteUserMessages(id))
      );

      await Promise.all(tasks);

      console.log();
      const stats = deleter.getStats();
      Logger.stats(stats.total, stats.deleted, stats.failed);
    } finally {
      await this.client.destroy();
      Logger.info("Bağlantı kesildi");
    }
  }
}
