import type { paths as API } from "./schema";
import createClient from "openapi-fetch";

export const client = createClient<API>({
  baseUrl: "https://api.cname.dev/",
});

type UpdateRecordRequestBody =
  API["/v1/domains-public/record"]["post"]["requestBody"]["content"]["application/json"];
export type { API, UpdateRecordRequestBody };
