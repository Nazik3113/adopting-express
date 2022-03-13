import express from "express";
import path from "path";
import formidable from "formidable";
import fs from "fs-extra";

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

const static_options = {
    extensions: ['htm', 'html'],
    setHeaders: (res, path, stat) => {
        res.set('X-Date', new Date());
        res.set('X-File-Size', `${stat.size} bytes`);
    }
};

const static_dir = path.join(path.resolve(), "../", "public");
const upload_dir = path.join(path.resolve(), "../", "data");

app.use("/static", express.static(static_dir, static_options));

app.post("/upload", async (req, res) => {
    const form = new formidable.IncomingForm();

    await fs.ensureDir(upload_dir);

    form.uploadDir = upload_dir;
    
    form.on("fileBegin", (name, file) => {
        const fileName = file.originalFilename.toLowerCase().replace(/\s+|_+/g, "-");
        file.path = `${form.uploadDir}/${fileName}`;
    });

    form.parse(req, (err, fields, files) => {
        if (err) {
            res.writeHead(413), {'content-type': 'text/plain'};
            return res.end(`${err.name}: ${err.message}\n\n`);
        }

        res.sendStatus(204);
    });
});

const header1 = (req, res, next) => {
    res.header("X-HEADER-1", "first");
    next();
};

const header2 = (req, res, next) => {
    res.header("X-HEADER-2", "second");
    next();
};

app.get("/headers", [header1, header2], (req, res) => {
    res.sendStatus(200);
});

app.listen(port);