if [ -n "$CONFIG_FILE" ]; then
  if [ ! -f "$CONFIG_FILE" ]; then
    echo "$(date) [cnamed]: Error: Config file $CONFIG_FILE not found."
    exit 1
  fi

  echo "$(date) [cnamed]: Using configuration file: $CONFIG_FILE"

  output=$(cnamed update --config "$CONFIG_FILE" 2>&1)
  exit_code=$?

  if [ $exit_code -eq 0 ]; then
    echo "$(date) [cnamed]: Update executed successfully using config file"
  else
    echo "$(date) [cnamed]: Error updating using config file"
    echo "Error output:"
    echo "$output"
  fi
else
  if [ -z "$TOKEN" ] || [ -z "$DOMAIN" ] || [ -z "$PORT" ]; then
    echo "$(date) [cnamed]: Error: TOKEN, DOMAIN, and PORT environment variables must be set when not using CONFIG_FILE."
    exit 1
  fi

  echo "$(date) [cnamed]: Updating $DOMAIN"

  output=$(cnamed update --token "$TOKEN" --domain "$DOMAIN" --port "$PORT" ${IP:+--ip "$IP"} 2>&1)
  exit_code=$?

  if [ $exit_code -eq 0 ]; then
    echo "$(date) [cnamed]: Update executed successfully for domain $DOMAIN"
  else
    echo "$(date) [cnamed]: Error updating domain $DOMAIN"
    echo "Error output:"
    echo "$output"
  fi
fi

exit $exit_code
