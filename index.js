const express = require('express');
const app = express();

const PORT = 4000; // Port for Authorisation API

app.use((req, res, next) => {
    const remoteAddress = req.connection.remoteAddress;
    // Check if the request is coming from localhost or specific IP addresses
    if (remoteAddress === '127.0.0.1' || remoteAddress === '::1') {
        // Allow the request to proceed - localhost clients only!
        res.send("connected to the internal API, yay");
    } else {
        // Reject the request with a 403 Forbidden response
        res.status(403).send('Forbidden');
    }
});

// Your API endpoints and logic here

app.listen(PORT, () => {
    console.log(`API C listening on port ${PORT}`);
});
