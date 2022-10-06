#!/usr/bin/env node
'use strict';

const tls = require('tls');
const fs = require('fs');
const express = require('express');
const app = express();
const port = 3000;

const options = {
  key: fs.readFileSync('certs/server/server.key'),
  cert: fs.readFileSync('certs/server/server.crt'),
  ca: fs.readFileSync('certs/ca/ca.crt'), // authority chain for the clients
  requestCert: true, // ask for a client cert
  rejectUnauthorized: true, // act on unauthorized clients at the app level
};



const server = require('https').Server(options, app);

app.use((req, res, next) => {
        try {
	        // Get the Certificate the User provided
                let cert = req.socket.getPeerCertificate();

                // The Certificate is VALID
                if (req.client.authorized) {
                        console.log(`Certificate "${cert.subject.CN}" is VALID and was issued by "${cert.issuer.CN}$
                        next();
                }
                // The Certificate is NOT VALID
                else if (cert.subject) {
                        console.log(`Certificates from "${cert.issuer.CN}" are NOT VALID. User "${cert.subject.CN}"$
                        res.sendStatus(403);

                }
                // A Certificate was NOT PROVIDED
                else {
                  console.log(`No Certificate provided by the client`);
                  res.status(403).send(`Certificate Required`);
                }
  } catch (err) {
  console.log(err);
  res.sendStatus(404);
  }
});

//Endpoint to test requests
app.get('/', (req, res) => {
  res.send("Hello - Valid certificate")
});

//Create server listening to port
server.listen(port, () => {
console.log(`[-] Server Listening on Port ${port}`);
});