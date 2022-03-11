import express from "express";
import { router } from "./router.js";

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());

app.use("/router", router);

const cb1 = (req, res, next) => {
    console.log("Cb1");
    setTimeout(() => {
        next();
    }, 2000);
};

const cb2 = (req, res, next) => {
    console.log("Cb2");
    setTimeout(() => {
        next();
    }, 2000);
};

const cb3 = (req, res) => {
    console.log("Cb3");
    res.send("Response from cb3.");
};

app.post("/", (req, res) => {
    console.log(req.body);
    res.send("Received new post request.");
});

app.get("/numbers/:num", (req, res) => {
    const { num } = req.params;
    console.log(`Num: ${num}`);
    res.send(`Received new get request with num: ${num}.`);
});

app.get("/next-func", (req, res, next) => {
    console.log("Response in next func");
    setTimeout(() => {
        next();
    }, 2000);
}, (req, res) => {
    res.send("Next func was called");
});

app.get("/next-arr", [cb1, cb2, cb3]);

app.get("/json", (req, res) => {
    const data = {
        hello: "hi",
        hi: "hello"
    };

    res.json(data);
});

app.listen(PORT, () => {
    console.log("Server started on port: " + PORT);
});