// server.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
const { json } = require("express/lib/response");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
    res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...

const datejson = (mydate) => {
    return {
        unix: mydate.getTime(),
        utc: mydate.toUTCString(),
    };
};

app.get("/api", (req, res) => {
    const ahora = new Date();
    return res.json(datejson(ahora));
});

app.get("/api/:data", function (req, res) {
    const { data } = req.params;

    const dateObject = new Date(data).getTime()
        ? new Date(data)
        : new Date(parseInt(data));

    if (!dateObject.getTime()) return res.json({ error: "Invalid Date" });
    return res.json(datejson(dateObject));
});

// listen for requests :)
var listener = app.listen(process.env.PORT || 3000, function () {
    console.log("Your app is listening on port " + listener.address().port);
});
