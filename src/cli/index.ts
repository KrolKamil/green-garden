import { createContainer } from "../container";
import { Logger } from "../shared/logger";
import "express-async-errors";
import { CommandLineInterface } from "./command-line-interface";

(async () => {
  const container = await createContainer();
  process.on("uncaughtException", (err) => {
    container.resolve<Logger>("logger").error(`Uncaught: ${err.toString()}`, err);
    process.exit(1);
  });

  process.on("unhandledRejection", (err) => {
    if (err) {
      container.resolve<Logger>("logger").error(`Unhandled: ${err.toString()}`, err);
    }
    process.exit(1);
  });
  console.log("WELCOME");
  const cli: CommandLineInterface = container.resolve("commandLineInterface")
  await cli.run();
})();
