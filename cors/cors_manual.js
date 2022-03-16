import express from "express";

const app = express();

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    res.header("Access-Control-Allow-Methods", "GET, POST, POST, DELETE");
    
    if (req.method === "OPTIONS") {
        res.sendStatus(204);
    } else {
        next();
    }
});

app.post("/post", (req, res) => {
    res.status(200).json({message: "OK"});
});

app.put("/put", (req, res) => {
    res.status(200).json({message: "OK"});
});

app.delete("/delete", (req, res) => {
    res.status(200).json({message: "OK"});
});

app.listen(3000);