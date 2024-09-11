import { program } from "commander";
import { addGetCommand } from "./get";
import { addUpdateCommand } from "./update";

program
  .name("cnamed")
  .description("CLI for https://cname.dev")
  .version(process.env.VERSION || "0.0.0-dev");

addGetCommand();
addUpdateCommand();

program.parse();
