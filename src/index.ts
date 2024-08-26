import { program } from "commander";
import { addUpdateProgram } from "./update";

program
  .name("cnamed")
  .description("CLI for https://cname.dev")
  .version(process.env.VERSION || "0.0.0-dev");

addUpdateProgram();

program.parse();
