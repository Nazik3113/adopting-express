import express from "express";
import cluster from "cluster";
import os from "os";

const cpusNum = os.cpus().length;
const port = process.env.PORT || 3000;

if (cluster.isPrimary) {
    console.log(`Master ${process.pid} is running.`);

    for (let processes = 0; processes < cpusNum; processes++) {
        cluster.fork();
    }

    cluster.on("exit", (worker, code, signal) => {
        cluster.fork();
        console.log(`worekr ${worker.process.pid} died`);
    });
} else {
    const app = express();

    app.get("/", async (req, res) => {
        res.status(200).json({ pid: process.pid });
    });

    app.get("/error", (req, res) => {
        process.exit();
        res.sendStatus(200);
    });

    app.listen(port);

    console.log(`Worker ${process.pid} started`);
}