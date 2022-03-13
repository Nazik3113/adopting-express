import express from "express";

const port = process.env.PORT || 3001;

const app = express();

app.get("/", (req, res) => {
    res.sendStatus(200);
});

app.get("/error", (req, res) => {
    process.exit(1);
    res.sendStatus(200);
});

app.listen(port);

// pm2 start pm2_clusterise.js -i 'max'
// pm2 start pm2_clusterise.js -i 5 --watch
// --watch for local development
// pm2 reload pm2_clusterise
// pm2 reload all