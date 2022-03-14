import express from "express";

const port = process.env.PORT || 3000;

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    const cookie_options = {
            httpOnly: true,
            maxAge: 500000, // 500 seconds 
            path: "/users"
        };
    res.cookie("X-DATE", new Date(), cookie_options);

    res.setHeader("Content-Type", "text/html");
    res.status(200).send(`
        <h1>Hello</h1>
    `);
});

app.get("/users", (req, res) => {
    const { cookie } = req.headers; 

    res.setHeader("Content-Type", "text/html");
    res.status(200).send(`
        <h1>Users</h1>
        <h1>Cookies: ${cookie}</h1>
    `);
});

app.listen(port);