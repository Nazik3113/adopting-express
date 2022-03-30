import mongoose from "mongoose";
import connection from "../mongoose/connection.js";

connection 
    .then(async (conn) => {
        const userSchema = new mongoose.Schema({
            name: String,
        });

        const accountSchema = new mongoose.Schema({
            uid: { type: mongoose.SchemaTypes.ObjectId, ref: "customers" },
            balance: Number,
        });

        const user = mongoose.model("customers", userSchema);

        const account = mongoose.model("accounts", accountSchema);

        await user.createCollection();
        await account.createCollection();

        let session = null;

        try {
            session = await account.startSession();
            await session.startTransaction();

            const userData = await user.create([{ name: "John" }], {
                session: session
            });

            const accountData = await account.create([{ balance: 100, uid: userData[0]._id }], {
                session: session
            });

            await session.commitTransaction();
        } catch ({ message }) {
            console.log(message);
            await session.abortTransaction();
        } finally {
            session.endSession();
            console.log("end");
        }
    });