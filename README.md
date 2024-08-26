# @cnamedev/cli

`cnamed` is a CLI tool for managing your records in the https://cname.dev

## Installation

```sh
$ curl -sL https://cli.cname.dev | bash
```

## Usage

```sh
Usage: cnamed update [options]

Updates the IP address for the specified hostname.

Options:
  --token <string>   Your access token (create it in the dashboard at https://cname.dev).
  --domain <string>  Domain name.
  --ip [string]      IP address to which the domain will be mapped. If not specified, it will be determined automatically.
  --port <number>    Port to which the domain will be mapped.
  -h, --help         display help for command
```
