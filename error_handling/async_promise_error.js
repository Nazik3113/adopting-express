import express from "express";

const port = process.env.PORT || 3000;

const app = express();

app.get("/", (req, res) => {
    Promise.reject(new Error('some error'));
    res.sendStatus(200);
});

// just for logs
process.on("unhandledRejection", async (error, promise) => {
    try {
        await promise
    } catch (error) {
        console.log(error.message);
    }
});

process.on("rejectionHandled", (promise) => {
    console.log("Rejection error: ", promise);
});

app.get("/error", async (req, res) => {
    try {
        const error = new Error('some error');
        error.statusCode = 404;
        
        await Promise.reject(error);

        res.sendStatus(200);
    } catch (error) {
        console.log(error);

        const statusCode = error.statusCode ? error.statusCode : 500;
        res.status(statusCode).json({error: error.message});
    }
});

app.listen(port);

// DEBUG=express:* nodemon async_promise_error.js