import express from "express";

const port = process.env.PORT || 3002;

const app = express();

app.get("/", (req, res) => {
    for (let i = 0; i < 1e7; i++) {
        Math.random();
    }
    res.sendStatus(200);
});

const server = app.listen(port);

// zero downtime
process.on("SIGINT", () => {
    console.info("SIGINT signal received");

    server.close((err) => {
        if (err) {
            console.error(err);
            process.exit(1);
        }
    }); 
});

// pm2 start zero_down_time.js -i 'max'