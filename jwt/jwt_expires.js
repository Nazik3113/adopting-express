import jwt from "jsonwebtoken";

const pass = "pa$$word";

const options = { algorithm: "HS512", expiresIn: "2s", issuer: "Nazarii Spikhalskyi", audience: "http://localhost:3000" };

const token = jwt.sign({name: "John"}, pass, options); // sync method
const verify = jwt.verify(token, pass);

console.log(token);
console.log(verify);

setTimeout(() => {
    try {
        const verify = jwt.verify(token, pass);
        console.log(token);
        console.log(verify);
    } catch (error) {
        console.log(error.message);
    }
}, 3000);