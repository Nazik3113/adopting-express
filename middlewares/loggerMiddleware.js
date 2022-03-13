import express from "express";

const port = process.env.PORT || 3000;

const app = express();

const usersRouters = express.Router();
const customersRouters = express.Router();

const logger = (req, res, next) => {
    console.log("LOGGED", new Date(), req.query);
    next();
};

app.use(logger); // application lvl middleware

app.get("/", (req, res) => {
    res.send("Hello world");
});

app.use("/router-middleware", (req, res, next) => { // router lvl middleware
    console.log(`Request type: ${req.method}`);
    next();
});

app.get("/router-middleware", (req, res) => {
    res.json({hello: "hi"});
});

app.get(
    "/skip-route", 
    (req, res, next) => {
        console.log(`Request type: ${req.method}`);
        if (req.query.hello === "hi") {
            next('route'); // skip route to 44
        } else {
            next();
        }
    },
    (req, res) => {
        console.log("Wrong request, return error.");
        res.status(400).json({error: "wrong request", status: 0});
    }
);

     
app.get("/skip-route", (req, res) => {
    res.status(200).json({error: null, status: 1});
});

usersRouters.use((req, res, next) => {
    console.log(`Datetime: ${Date.now()}`);
    res.respObj = {hello: "hi without id("}
    next();
});

usersRouters.use(
    "/:id",
    (req, res, next) => {
        console.log(`Request URL: ${req.originalUrl}`);
        res.respObj = {hello: "hi with id: " + req.params.id}
        next();
    },
    (req, res, next) => {
        console.log(`Request type: ${req.originalUrl}`);
        next();
    },
);

customersRouters.get(
    "/",
    (req, res) => {
        res.sendStatus(204);
    }
);

app.use("/customers", customersRouters);
app.use("/users", usersRouters, (req, res) => {
    res.json(res.respObj);
});

app.get("/error", (req, res) => {
    throw Error("error");
});

app.use((err, req, res, next) => {
    console.log(err);
    res.sendStatus(500);
});

app.listen(port);