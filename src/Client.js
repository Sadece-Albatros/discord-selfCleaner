import { Client } from "discord.js-selfbot-v13";
import Logger from "./Logger.js";

export default class DiscordClient {
  constructor(token) {
    this.token = token;
    this.client = new Client({
      checkUpdate: false,
      patchVoice: false
    });
    this.ready = false;
  }

  async connect() {
    return new Promise((resolve, reject) => {
      this.client.once("ready", () => {
        this.ready = true;
        Logger.success(`Giriş yapıldı: ${this.client.user.tag}`);
        resolve();
      });

      this.client.once("error", (err) => {
        reject(err);
      });

      this.client.login(this.token).catch(reject);
    });
  }

  async getDMChannel(userId) {
    const user = await this.client.users.fetch(userId);
    if (!user) return null;
    return user.dmChannel || await user.createDM();
  }

  async destroy() {
    await this.client.destroy();
    this.ready = false;
  }
}
