import express from "express";
import helmet from "helmet";
import path from "path";

const app = express();

app.use(helmet.contentSecurityPolicy({
    directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "code.jquery.com"],
    }
}));

app.get("/", (req, res) => {
    const file = path.resolve(path.join("index.html"));

    res.sendFile(file);
});

app.listen(3000, (err) => {
    if (err) {
        console.log(err);
    }

    console.log("started");
});