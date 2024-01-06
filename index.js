const clientId = require("./c.json").clientID
const port = require("./c.json").expressPort
let client = new (require('discord-rpc-revamp').Client)();

const express = require('express')
const app = express()
// allow cors
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    next();
});

app.get("/updateListening", (req, res) => {
    if (req.query.details == "NaN" || req.query.state == "NaN") return res.send("Invalid")
    client.setActivity({
        details: req.query.details,
        state: req.query.state,
        startTimestamp: Date.now(),
        // set image to url image
    }).then(_ => console.log('set activity')).catch(console.error);
    console.log("Updated RPC to " + req.query.details + " " + req.query.state)
    res.send("Updated")
})

app.get("/alive", (req, res) => {
    res.sendStatus(200)
})

client.connect({ clientId: clientId }).catch(console.error);

client.on('ready', _ => {
    client.setActivity({
        details: 'YouTube Music',
        state: 'Idle',
        startTimestamp: Date.now()
    }).then(_ => console.log('set activity')).catch(console.error);

    client.subscribe('ACTIVITY_JOIN');
    client.subscribe('ACTIVITY_JOIN_REQUEST');

    client.on('ACTIVITY_JOIN', data => {
        console.log('ACTIVITY_JOIN', data);
    });
});

app.listen(port, () => console.log(`Local YT RPC server listening on http://localhost:${port}`))
