import jwt from "jsonwebtoken";

const token = jwt.sign({name: "John"}, "pa$$word"); // sync method

console.log(token);