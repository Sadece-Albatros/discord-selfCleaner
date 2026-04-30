import { SingleBar, Presets } from "cli-progress";
import Logger from "./Logger.js";

export default class MessageDeleter {
  constructor(client, config) {
    this.client = client;
    this.batchSize = config.batchSize;
    this.retryAttempts = config.retryAttempts;
    this.retryDelay = config.retryDelay;
    this.stats = { total: 0, deleted: 0, failed: 0 };
  }

  async deleteUserMessages(userId) {
    const channel = await this.client.getDMChannel(userId);
    if (!channel) {
      Logger.error(`Kullanıcı bulunamadı: ${userId}`);
      return;
    }

    const user = await this.client.client.users.fetch(userId);
    Logger.info(`Kanal hazırlandı: ${user.tag}`);

    const messages = await this.fetchAllMyMessages(channel);
    if (messages.length === 0) {
      Logger.warn(`${user.tag} için silinecek mesaj yok`);
      return;
    }

    this.stats.total += messages.length;
    await this.bulkDelete(messages, user.tag);
  }

  async fetchAllMyMessages(channel) {
    const myId = this.client.client.user.id;
    const messages = [];
    let lastId = null;

    while (true) {
      const options = { limit: this.batchSize };
      if (lastId) options.before = lastId;

      const fetched = await channel.messages.fetch(options);
      if (fetched.size === 0) break;

      const myMessages = fetched.filter(m => m.author.id === myId);
      messages.push(...myMessages.values());

      lastId = fetched.last().id;
    }

    return messages.reverse();
  }

  async bulkDelete(messages, userTag) {
    const progress = new SingleBar({
      format: `${userTag} |{bar}| {percentage}% | {value}/{total} | Hız: {speed} msg/s`,
      barCompleteChar: "█",
      barIncompleteChar: "░",
      hideCursor: true
    }, Presets.shades_classic);

    progress.start(messages.length, 0, { speed: 0 });

    const startTime = Date.now();
    const queue = [...messages];

    while (queue.length > 0) {
      const batch = queue.splice(0, this.batchSize);
      const results = await Promise.allSettled(
        batch.map(msg => this.deleteWithRetry(msg))
      );

      results.forEach(r => {
        if (r.status === "fulfilled" && r.value) {
          this.stats.deleted++;
        } else {
          this.stats.failed++;
        }
      });

      const elapsed = (Date.now() - startTime) / 1000;
      const speed = (this.stats.deleted / elapsed).toFixed(1);
      progress.increment(batch.length, { speed });
    }

    progress.stop();
  }

  async deleteWithRetry(message) {
    for (let attempt = 1; attempt <= this.retryAttempts; attempt++) {
      try {
        await message.delete();
        return true;
      } catch (err) {
        if (err.code === 429) {
          const delay = this.retryDelay * Math.pow(2, attempt - 1);
          await this.sleep(delay);
        } else if (attempt === this.retryAttempts) {
          return false;
        }
      }
    }
    return false;
  }

  sleep(ms) {
    return new Promise(r => setTimeout(r, ms));
  }

  getStats() {
    return { ...this.stats };
  }
}
