FROM oven/bun:1.1.26-alpine

WORKDIR /root

RUN apk --no-cache add dcron curl jq bash
RUN curl -sL https://cli.cname.dev | bash

COPY start.sh /root/start.sh
RUN chmod +x /root/start.sh

COPY update.sh /root/update.sh
RUN chmod +x /root/update.sh

CMD ["bash", "/root/start.sh"]
