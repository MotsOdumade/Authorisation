const express = require('express');
const requestIp = require('request-ip');
const app = express();

const PORT = 3004; // Port for Authorisation API

// Middleware to get client IP address
app.use(requestIp.mw());

app.get('/v1/authorisation', (req, res) => {
    const remoteAddress = req.clientIp;
    // Check if the request is coming from localhost or specific IP addresses
    if (remoteAddress === '127.0.0.1' || remoteAddress === '::1') {
        // Allow the request to proceed - localhost clients only!
        res.send("connected to the internal API, yay");
    } else {
        // Reject the request with a 403 Forbidden response
        //res.status(403).send('Forbidden');
        res.send(req);
    }
});



app.listen(PORT, () => {
    console.log(`Authorisation API listening on port ${PORT}`);
});
