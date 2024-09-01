# `cnamed`

`cnamed` is a CLI tool designed to update your entries in the https://cname.dev free dynamic reverse proxy service.

## About

The `cnamed` CLI is designed to update your domain's IP address with a single request.
It can use your current public IP or a specified IP address.

However, the `cnamed` itself does not continuously monitor or update your IP.

For automatic, recurring updates, you have two options:

1. Set up a cron job on your system to run the `cnamed` periodically.
2. Use our [Docker](#docker) container, which is pre-configured to run the `cnamed` on a schedule.

## Installation

```sh
$ curl -sL https://cli.cname.dev | bash
```

## Supported Architectures

The `cnamed` supports the following architectures:

- `linux-x64`
- `linux-arm64`
- `darwin-x64`
- `darwin-arm64`

> [!NOTE]
> If your system architecture is not listed above, you can use the [API](#api) directly to update your domain.
> See the API Usage section below for details.

## Usage

### CLI

The CLI supports two methods of input: using a configuration file or providing individual arguments.

#### Using a configuration file:

```sh
$ cnamed update --config <path-to-config-json>
```

Example config file (JSON format):

```json
{
  "$schema": "https://cli.cname.dev/schemas/update.json",
  "token": "your_token",
  "domains": [
    {
      "domain": "example1.com",
      "ip": "192.168.1.1",
      "port": "8080"
    },
    {
      "domain": "example2.com",
      "port": "8081"
    }
  ]
}
```

#### Using individual arguments:

```sh
$ cnamed update --token <your_token> --domain <your_domain> --ip <your_ip> --port <your_port>
```

Example:

```sh
$ cnamed update --token abc123 --domain example.com --ip 192.168.1.1 --port 8080
```

> [!NOTE]
> The `--ip` argument is optional. If not provided, the current public IP will be used.

Full list of options:

```sh
Usage: cnamed update [options]

Updates the IP address for the specified hostname(s).

Options:
  --config <string>   Path to a JSON configuration file containing domain updates.
  --token <string>    Your access token (create it in the dashboard at https://cname.dev).
  --domain <string>   Domain name to update.
  --ip <string>       IP address to which the domain will be mapped. If not specified, it will be determined automatically.
  --port <string>     Port to which the domain will be mapped.
  --dry <boolean>     Dry run.
  -h, --help          display help for command
```

### Docker

```sh
$ docker run -d \
  --name cnamed \
  -e TOKEN=your_token \
  -e DOMAIN=your_domain.com \
  -e PORT=your_port \
  -e CRON_SCHEDULE="*/15 * * * *" \
  cnamedev/cnamed:latest
```

#### Docker Compose

Basic example:

```yaml
services:
  cnamed:
    image: cnamedev/cnamed:latest
    environment:
      - TOKEN=your_token
      - DOMAIN=your_domain
      - PORT=your_port
      - CRON_SCHEDULE=*/15 * * * *
    restart: unless-stopped
```

Example using a configuration file:

```yaml
services:
  cnamed:
    image: cnamedev/cnamed:latest
    volumes:
      - ./cnamed-config.json:/app/config.json
    environment:
      - CONFIG_FILE=/app/config.json
      - CRON_SCHEDULE=*/15 * * * *
    restart: unless-stopped
```

#### Environment Variables

- `TOKEN`: Your cname.dev access token (required if not using `CONFIG_FILE`)
- `DOMAIN`: The domain name to update (required if not using `CONFIG_FILE`)
- `PORT`: The port to use (required if not using `CONFIG_FILE`)
- `IP`: The IP address to set (optional)
- `CRON_SCHEDULE`: The schedule for running the update (default: `*/15 * * * *`, which is every 15 minutes)
- `CONFIG_FILE`: Path to the configuration file inside the container (optional, overrides individual `TOKEN`, `DOMAIN`, `PORT`, and `IP` settings)

### API

You can also use the API directly to update your domain.

Here's an example using curl:

```bash
curl -X PUT \
  -H "Content-Type: application/json" \
  -d '{
    "token": "YOUR_TOKEN",
    "domain": "YOUR_DOMAIN",
    "ip": "YOUR_IP",
    "port": YOUR_PORT
  }' \
  http://api.cname.com/v1/domains/record
```
