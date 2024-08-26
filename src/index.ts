import { program } from "commander";
import packageJson from "../package.json";
import { addUpdateProgram } from "./update";

program
  .name("cnamed")
  .description("CLI for https://cname.dev")
  .version(packageJson.version);

addUpdateProgram();

program.parse();
