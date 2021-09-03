# awshealth-to-slack

## Run locally

```bash
docker-compose up --build
```

Will build and start the docker container.  You can use any of the example payloads.

```bash
curl -s "http://localhost:9000/2015-03-31/functions/function/invocations" -d @samples/example_ELB.json | jq . 
```

### Test integration with slack

If you want to see how it integrates with slack create an [Incoming Webhook](https://api.slack.com/messaging/webhooks).  Then in the `docker-compose.yml` set the incoming webhook url to the `SLACK_WEBHOOK_URL` environment variable.

### Example Post

![AWSHealth_Slack](./imgs/AwsHealth_Slack.png)