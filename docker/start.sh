echo "${CRON_SCHEDULE:-*/30 * * * *} /root/update.sh >> /var/log/update.log 2>&1" >>/etc/crontabs/root
bash /root/update.sh && crond -f
