import express from "express";

const app = express();

app.get("/users", (res, res) => {
    res.status(200).json({data: [{name: "John"}]});
});

export default app;