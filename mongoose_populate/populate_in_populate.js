import mongoose from "mongoose";
import connection from "../mongoose/connection.js";

connection
    .then(async () => {
        const userSchema = new mongoose.Schema({
            name: String,
            friends: [{
                type: mongoose.SchemaTypes.ObjectId, 
                ref: "users"
            }],
        });

        const user = mongoose.model("users", userSchema, "users");

        const [userData1, userData2, userData3] = await Promise.all([
            user.create({ name: "John Doe" }),
            user.create({ name: "Chuck Norris" }),
            user.create({ name: "John Doe" })
        ]);

        userData1.friends.push(userData2._id, userData3._id);
        userData2.friends.push(userData3._id);

        const [userData1AfterSave, userData2AfterSave] = await Promise.all([
            userData1.save(),
            userData2.save(),
        ]);

        const userOne = await getUserWithPopulateInPopulate(user, userData1._id);
        const userTwo = await getUserWithPopulateInPopulate(user, userData2._id);
        const userThree = await getUserWithPopulateInPopulate(user, userData3._id);

        console.log(JSON.stringify(userOne, null, 4));
        console.log(JSON.stringify(userTwo, null, 4));
        console.log(JSON.stringify(userThree, null, 4));
    })
    .catch((error) => {
        console.error("Error:", error);
    });

function getUserWithPopulateInPopulate(model, userId) {
    return model
        .findById(userId)
        .select("-_id -__v")
        .populate({
            path: "friends", 
            populate: { path: "friends", select: "-_id -__v" },
            select: "-_id -__v"
        })
        .lean();
}    