#!/usr/bin/env node

const program = require('commander')
const { version } = require('../package.json')

const Client = require('..')

program
  .version(version, '-v, --version')
  .usage('[options]')
  .option('-u, --url <url>', 'URL of the webhook proxy service. Default: https://smee.io/new')
  .option('-t, --target <target>', 'Full URL (including protocol and path) of the target service the events will forwarded to. Default: http://127.0.0.1:PORT/PATH')
  .option('-p, --port <n>', 'Local HTTP server port', process.env.PORT || 3000)
  .option('-P, --path <path>', 'URL path to post proxied requests to`', '/')
  .parse(process.argv)
const options = program.opts();

let target
if (options.target) {
  target = options.target
} else {
  target = `http://127.0.0.1:${options.port}${options.path}`
}

async function setup () {
  let source = options.url

  if (!source) {
    source = await Client.createChannel()
  }

  const client = new Client({ source, target })
  client.start()
}

setup()
