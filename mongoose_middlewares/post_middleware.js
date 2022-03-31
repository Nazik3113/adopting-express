import mongoose from "mongoose";
import connection from "../mongoose/connection.js";
import crypto from "crypto";

const passwordSalt = "dwadadgagdutagdhiauidgutfedegsuydh27te6te73t653";

connection
    .then(async (conn) => {
        const userSchema = new mongoose.Schema({
            name: String,
            password: String
        });

        userSchema.post("save", function(next) {
            this.password = crypto.createHash('md5').update(this.password + passwordSalt).digest("hex");

            next();
        });

        const user = mongoose.model("customers", userSchema);

        try {
            const userData = await user.create({
                name: "John",
                password: "fksfbsyefs657",
            });

            console.log(userData);
        } catch ({ name, message }) {
            console.log(`${name}: ${message}`);
        }
    });

// userSchema.post("find", function(next) {
//     console.log("find");
//     next();
// });

// userSchema.post("findOne", function(next) {
//     console.log("find one");
//     next();
// });

// also can be used