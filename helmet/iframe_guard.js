import express from "express";
import helmet from "helmet";

const app = express();

app.use(helmet.frameguard());

app.get("/", (req, res) => {
    res.sendStatus(204);
});

app.listen(3000, (err) => {
    if (err) {
        console.log(err);
    }

    console.log("started");
});