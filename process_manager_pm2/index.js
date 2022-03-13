import express from "express";

const port = process.env.PORT || 3000;

const app = express();

app.get("/", (req, res) => {
    res.sendStatus(200);
});

app.get("/error", (req, res) => {
    process.exit(1);
    res.sendStatus(200);
});

app.listen(port);

// pm2 start index.js