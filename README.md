# @cnamedev/cli

`cnamed` is a CLI tool designed to update your entries in the https://cname.dev free tunneling service.

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
> If your system architecture is not listed above, you can use the [API](#api) directly to update your domain. See the API Usage section below for details.

## Usage

### CLI

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

### Docker

```bash
docker run -d \
  --name cnamed \
  -e TOKEN=your_token \
  -e DOMAIN=your_domain.com \
  -e PORT=your_port \
  -e CRON_SCHEDULE="*/15 * * * *" \
  cnamedev/cnamed:latest
```

#### Docker Compose

```yaml
services:
  cnamed:
    image: cnamedev/cnamed:latest
    environment:
      - TOKEN=your_token
      - DOMAIN=your_domain.com
      - PORT=your_port
      - CRON_SCHEDULE=*/15 * * * *
    restart: unless-stopped
```

#### Environment Variables

- `TOKEN`: Your cname.dev access token (required)
- `DOMAIN`: The domain name to update (required)
- `PORT`: The port to use (required)
- `IP`: The IP address to set (optional)
- `CRON_SCHEDULE`: The schedule for running the update (default: "_/15 _ \* \* \*", which is every 15 minutes)

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
  http://api.cname.localhost/v1/domains/record
```
