import { program } from "commander";
import fs from "fs/promises";
import { type UpdateRecordProps } from "./types";

const prefix = "[cnamed]";

/**
 * Updates DNS records for the specified domains
 */
async function updateRecord(props: UpdateRecordProps) {
  for (const domainConfig of props.domains) {
    try {
      console.info(
        prefix,
        `Updating ${domainConfig.domain} record with ${domainConfig.ip || ""}:${
          domainConfig.port
        }`
      );

      const body: Record<string, unknown> = {
        token: props.token,
        domain: domainConfig.domain,
        port: parseInt(domainConfig.port),
      };

      if (domainConfig.ip) {
        body.ip = domainConfig.ip;
      }

      if (props.dry) {
        body.dry = String(body.dry);
      }

      const url = "https://api.cname.dev/v1/domains/record";
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const result = await response.json();
      if (!result.success) {
        throw new Error(`Cannot update record for ${domainConfig.domain}`);
      }

      console.info(
        prefix,
        `The record for ${domainConfig.domain} has been successfully updated!`
      );
    } catch (err) {
      if (err instanceof Error) {
        console.error(prefix, err.message);
      } else {
        throw err;
      }
    }
  }
}

/**
 * Asynchronously loads and parses the JSON configuration file
 */
async function loadConfig(configPath: string): Promise<UpdateRecordProps> {
  try {
    const fileContents = await fs.readFile(configPath, "utf8");
    return JSON.parse(fileContents) as UpdateRecordProps;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to load or parse config file: ${error.message}`);
    }
    throw error;
  }
}

/**
 * Adds the update command to the CLI program
 */
export function addUpdateProgram() {
  program
    .command("update")
    .description("Updates the IP address and port for the specified domain(s).")
    .option(
      "--config <string>",
      "Path to a JSON configuration file containing domain updates."
    )
    .option(
      "--token <string>",
      "Your access token (create it in the dashboard at https://cname.dev)."
    )
    .option("--domain <string>", "Domain name to update.")
    .option(
      "--ip <string>",
      "IP address to which the domain will be mapped. If not specified, it will be determined automatically."
    )
    .option("--port <string>", "Port to which the domain will be mapped.")
    .option("--dry <boolean>", "Dry run.")
    .action(async (args) => {
      try {
        let updateProps: UpdateRecordProps;

        if (args.config) {
          // Load configurations from a JSON file
          updateProps = await loadConfig(args.config);
        } else if (args.token && args.domain && args.port) {
          // Create configuration from command-line arguments
          updateProps = {
            token: args.token,
            dry: args.dry,
            domains: [
              {
                domain: args.domain,
                ip: args.ip,
                port: args.port,
              },
            ],
          };
        } else {
          throw new Error(
            "Invalid input. Please provide either a config file or all required arguments (token, domain, and port)."
          );
        }

        if (!updateProps.token || updateProps.domains.length === 0) {
          throw new Error("Missing token or domain configurations.");
        }

        await updateRecord(updateProps);
      } catch (error) {
        if (error instanceof Error) {
          console.error(prefix, "Error:", error.message);
        } else {
          console.error(prefix, "An unexpected error occurred.");
        }
        process.exit(1);
      }
    });
}
