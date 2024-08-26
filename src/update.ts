import { program } from "commander";

const prefix = "[cnamed]";

type UpdateRecordProps = {
  token: string;
  domain: string;
  ip?: string;
  port: string;
};

async function updateRecord(props: UpdateRecordProps) {
  try {
    console.info(
      prefix,
      `Updating ${props.domain} record with ${props.ip || ""}:${props.port}`
    );

    const body = JSON.stringify({
      token: props.token,
      domain: props.domain,
      ip: props.ip,
      port: parseInt(props.port),
    });

    const url = "https://api.cname.dev/v1/domains/record";
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    });

    const result = await response.json();
    if (!result.success) {
      throw new Error("Cannot update record");
    }

    console.info(prefix, "The record have been successfully updated!");
  } catch (err) {
    if (err instanceof Error) {
      return console.error(prefix, err.message);
    }

    throw err;
  }
}

export function addUpdateProgram() {
  program
    .command("update")
    .description("Updates the IP address for the specified hostname.")
    .requiredOption(
      "--token <string>",
      "Your access token (create it in the dashboard at https://cname.dev)."
    )
    .requiredOption("--domain <string>", "Domain name.")
    .option(
      "--ip [string]",
      "IP address to which the domain will be mapped. If not specified, it will be determined automatically."
    )
    .requiredOption(
      "--port <number>",
      "Port to which the domain will be mapped."
    )
    .action(async (args) => {
      await updateRecord(args);
    });
}
