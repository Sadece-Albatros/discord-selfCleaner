import chalk from "chalk";

export default class Logger {
  static info(msg) {
    console.log(chalk.blue("[INFO]"), msg);
  }

  static success(msg) {
    console.log(chalk.green("[SUCCESS]"), msg);
  }

  static warn(msg) {
    console.log(chalk.yellow("[WARN]"), msg);
  }

  static error(msg) {
    console.log(chalk.red("[ERROR]"), msg);
  }

  static stats(total, deleted, failed) {
    console.log(chalk.cyan("\nİSTATİSTİKLER"));
    console.log(chalk.gray("─".repeat(40)));
    console.log(chalk.blue("Toplam Mesaj:"), total.toLocaleString());
    console.log(chalk.green("Silinen:"), deleted.toLocaleString());
    console.log(chalk.red("Başarısız:"), failed.toLocaleString());
  }
}
