import jwt from "jsonwebtoken";

const pass = "pa$$word";

const options = { algorithm: 'HS512' };

const token = jwt.sign({name: "John"}, pass, options); // sync method
const verify = jwt.verify(token, pass)

console.log(token);
console.log(verify);