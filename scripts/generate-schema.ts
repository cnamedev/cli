import openapiTS, { astToString } from "openapi-typescript";
import path from "node:path";

const url = "https://api.cname.dev/v1/domains-public/openapi.json";
const ast = await openapiTS(url);
const contents = astToString(ast);
await Bun.write(path.resolve(__dirname, "../src/api/schema.ts"), contents);
