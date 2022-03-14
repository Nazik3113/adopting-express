import express from "express";
import https from "https";
import pem from "pem";

pem.createCertificate({days: 1, selfSigned: true}, (error, keys) => {
    if (error) throw error;

    const app = express();

    app.use(express.json());

    app.get("/", (req, res) => {
        const cookie_options = {
            httpOnly: true, 
            secure: true
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

    https
        .createServer({ key: keys.serviceKey, cert: keys.certificate }, app)
        .listen(3000, () => {
            console.log("HTTPS Server started on port 3000");
        });
});
