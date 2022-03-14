import express from "express";
import session from "express-session";
import { MemoryStore } from "express-session";

const app = express();

const sessionOptions = {
    key: "user",
    secret: "pa$$word",
    resave: false, // disable session save
    rolling: true, // reset maxAge on every query
    saveUninitialized: false, // disable save cookie before initialize 
    // storage: new MemoryStore(),
    cookie: {
        httpOnly: true,
        maxAge: 15 * 60 * 1000 // 15 minutes
    }
};

if (process.env.NODE_ENV == "production") {
    sessionOptions.cookie.secure = true;
}

app.use(express.json());
app.use(session(sessionOptions));

app.get("/", (req, res) => {
    const { name } = req.query;

    req.session.user = { name };

    res.setHeader("Content-Type", "text/html");
    res.status(200).send(`
        <h1>Hello</h1>
        <a href="/users">To users</a>
    `);
});

app.get("/users", (req, res) => {
    console.log(req.session.user);
    if (req.session.user === undefined) {
        return res.redirect("/");
    }

    const { user } = req.session;

    res.status(200).send(`
        <h1>Users from cookie: ${user.name}</h1>
    `);
});

app.listen(3000, () => {
    console.log("Server started");
});