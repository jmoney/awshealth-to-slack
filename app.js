const { IncomingWebhook } = require('@slack/webhook');
const moment = require('moment-timezone')

const slackWebhookUrl = process.env.SLACK_WEBHOOK_URL;
const webhook = new IncomingWebhook(slackWebhookUrl);

const language = process.env.LOCALE
const timezone = process.env.TZ

const sendToSlack = process.env.SEND_TO_SLACK

exports.handler =  async function(event, context) {

    console.log(JSON.stringify(event, null, 4))
    const message = mapToSlack(event)
    console.log(message)
    if (slackWebhookUrl) {
        await webhook.send(
            message
        )
    }

    return message
}

function mapToSlack(event) {
    const fields = []

    fields.push({
        title: 'Start Time',
        value: moment(event.detail.startTime).tz(timezone).format(),
        short: true
    })

    fields.push({
        title: 'End Time',
        value: moment(event.detail.endTime).tz(timezone).format(),
        short: true
    })
    
    fields.push({
        title: 'Type Code',
        value: event.detail.eventTypeCode,
        short: false
    })

    if (event.resources.length > 0) {
        fields.push({
            title: 'Resources Affected',
            value: event.resources.join(),
            short: false
        })
    }

    const attachment = {
        color: mapToColor(event.detail.eventTypeCategory),
        title: [event.detail.service, 'Account: ' + event.account, event.region, event.status].join(' | '),
        text: event.detail.eventDescription.filter(description => description.language === language).map(description => description.latestDescription)[0],
        fields: fields,
        ts: moment(new Date(event.time)).unix()
    }

    return {
        attachments: [attachment]
    }
}

function mapToColor(category) {
    switch(category) {
        case 'issue':
            return 'danger'
        default:
            return 'good'
    }
}