import { program } from "commander";
import { client } from "../api";
import { logPrefix } from "../common";
import { type GetRecordProps } from "./types";

/**
 * Returns DNS records for the specified domains
 */
async function getRecord(props: GetRecordProps) {
  try {
    console.info(logPrefix, `Getting ${props.domain} record...`);

    const response = await client.GET("/v1/domains-public/record", {
      params: {
        query: {
          domain: props.domain,
        },
        header: {
          authorization: `Bearer ${props.token}`,
        },
      },
    });

    if (!response.data?.ok) {
      throw new Error(`Cannot get record for ${props.domain}`);
    }

    console.info(
      logPrefix,
      `The record for ${props.domain} is: ${response.data.ip}:${response.data.port}`
    );
  } catch (err) {
    if (err instanceof Error) {
      console.error(logPrefix, err.message);
    } else {
      throw err;
    }
  }
}

/**
 * Adds the get command to the CLI program
 */
export function addGetCommand() {
  program
    .command("get")
    .description("Returns the IP address and port for the specified domain.")
    .option(
      "--token <string>",
      "Your access token (create it in the dashboard at https://cname.dev)."
    )
    .option("--domain <string>", "Domain name.")
    .action(async (args) => {
      try {
        const getProps: GetRecordProps = {
          token: args.token,
          domain: args.domain,
        };

        if (!getProps.token || !getProps.domain) {
          throw new Error("Missing token or domain configurations.");
        }

        await getRecord(getProps);
      } catch (error) {
        if (error instanceof Error) {
          console.error(logPrefix, "Error:", error.message);
        } else {
          console.error(logPrefix, "An unexpected error occurred.");
        }
        process.exit(1);
      }
    });
}
