import express from "express";

const port = process.env.PORT || 3000;

const app = express();

app.get("/", (req, res) => {
    throw new Error('some error');
});

app.use(({message}, req, res, next) => {
    res.status(500).json({message: message});
}); 

// logs only
process.on("uncaughtException", (error) => {
    console.log(error);
});

app.listen(port);

// DEBUG=express:* nodemon async_promise_error.js