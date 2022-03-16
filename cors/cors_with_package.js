import express from "express";
import cors from "cors";

const app = express();

// app.options("/post", cors());
// app.options("/put", cors());
// app.options("/delete", cors());

const wtitelist = [
    "http://localhost:8080",
    "http://127.0.0.1:8080",
    "http://127.0.0.2:8080",
];

const corsOptionsWithMulripleOrigin = {
    // origin: "*", // default
    origin: (origin, callback) => {
        console.log("origin", origin);

        const isExist = wtitelist.some(item => item === origin);
        if (isExist) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    optionsSuccessStatus: 200
};

const corsOptions = {
    // origin: "*", // default
    origin: "http://localhost:8080",
    optionsSuccessStatus: 200,
    // prefligthContinue: true // next()
};

// app.use(cors());
app.use(cors(corsOptions));

// app.post("/post", cors(corsOptions), (req, res) => {
app.post("/post", (req, res) => {
    res.status(200).json({message: "OK"});
});

// app.put("/put", cors(corsOptionsWithMulripleOrigin), (req, res) => {
app.put("/put", (req, res) => {
    res.status(200).json({message: "OK"});
});

// app.delete("/delete", cors(), (req, res) => {
app.delete("/delete", (req, res) => {
    res.status(200).json({message: "OK"});
});

app.listen(3000);