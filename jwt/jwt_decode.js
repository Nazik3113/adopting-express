import jwt from "jsonwebtoken";

const pass = "pa$$word";

const options = { algorithm: 'HS512' };

const token = jwt.sign({name: "John"}, pass, options, (error, token) => {
    const payload_json = jwt.decode(token);
    const all_json = jwt.decode(token, {complete: true});

    console.log(payload_json);
    console.log(all_json);
});
