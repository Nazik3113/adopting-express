import express from "express";

const port = process.env.PORT || 3000;

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    const cookie_options = {
            httpOnly: true,
            maxAge: 5000 // 5 seconds 
        };
    res.cookie("X-DATE", new Date(), cookie_options);

    res.setHeader("Content-Type", "text/html");
    res.status(200).send(`
        <script>
            console.log("cookie ->", document.cookie);
        </script>
        <h1>Hello</h1>
    `);
});

app.listen(port);