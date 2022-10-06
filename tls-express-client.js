#!/usr/bin/env node
'use strict';

const port = 80;
const hostname = 'memecoinlist.com';

const tls = require('tls');
const fs = require('fs');
const https = require('https')

const options = {
  host: hostname,
  port: port,
  requestCert:true,
  rejectUnauthorized: true,
  // Necessary only if using the client certificate authentication
  key: fs.readFileSync('certs/client/client.key'),
  cert: fs.readFileSync('certs/client/client.crt'),

  // Necessary only if the server uses the self-signed certificate
  ca: fs.readFileSync('certs/ca/ca.crt')
};

https.request(options, res => {
  let body = ''
  res.on('data', data => body += data)
  res.on('end', () => {
    console.log('response data: ' + body)
  })
}).on('error', err => {
  console.warn(err)
}).end()

