import jwt from "jsonwebtoken";

const pass = "pa$$word";

const token = jwt.sign({name: "John"}, pass); // sync method
const verify = jwt.verify(token, pass)

console.log(token);
console.log(verify);