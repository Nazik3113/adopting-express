import express from "express";
import nocache from "nocache";

const app = express();

app.use(nocache());

app.get("/", (req, res) => {
    res.sendStatus(204);
});

app.listen(3000, (err) => {
    if (err) {
        console.log(err);
    }

    console.log("started");
});