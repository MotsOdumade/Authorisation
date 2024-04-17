const express = require('express');
const requestIp = require('request-ip');
const app = express();
const PORT = 3004; // Port for Authorisation API - we'll only enable localhost access

// Middleware to get client IP address
app.use(requestIp.mw());


app.get('/v1/authorisation', (req, res) => {
    const remoteAddress = req.connection.remoteAddress;
// ------ for localhost clients (APIs) we provide an authorisation service
    if (remoteAddress === '::ffff:127.0.0.1' || remoteAddress === '::1') {
// ------ apply logic to check if the user is authorised to make their request
        const responseObj = {
            'cacheable': false,
            'authorised': true
        };
        res.json(responseObj);
    } else {
// ------ don't serve external clients
        // Reject the request with a 403 Forbidden response
        res.status(403).send('Forbidden');
    }
});



app.listen(PORT, () => {
    console.log(`Authorisation API listening on port ${PORT}`);
});
