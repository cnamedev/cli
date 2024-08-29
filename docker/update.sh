if [ -z "$TOKEN" ] || [ -z "$DOMAIN" ] || [ -z "$PORT" ]; then
  echo "Error: TOKEN, DOMAIN, and PORT environment variables must be set."
  exit 1
fi

echo "$(date) [cnamed]: Updating $DOMAIN"

output=$(cnamed update --token $TOKEN --domain $DOMAIN --port $PORT 2>&1)
exit_code=$?

if [ $exit_code -eq 0 ]; then
  echo "$(date) [cnamed]: Update executed successfully for domain $DOMAIN"
else
  echo "$(date) [cnamed]: Error updating domain $DOMAIN"
  echo "Error output:"
  echo "$output"
fi
