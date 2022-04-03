import mongoose from "mongoose";
import connection from "../mongoose/connection.js";
import autopopulate from "mongoose-autopopulate";

connection
    .then(async (conn) => {
        const addressesSchema = mongoose.Schema({
            city: String,
            street: String,
        });

        const autopopulateOptions = (params) => {
            console.log("autopopulateOptions");

            return { select: "-_id -__v" }
        };

        const userSchema = mongoose.Schema({
            name: String,
            address: {
                type: mongoose.SchemaTypes.ObjectId,
                ref: "addresses",
                required: true,
                autopopulate: { select: "-_id -__v" },
                // autopopulate: true,
                // autopopulate: autopopulateOptions,
            },
        });

        userSchema.plugin(autopopulate);

        const user = mongoose.model("customers", userSchema);
        const address = mongoose.model("addresses", addressesSchema);

        try {
            const addressData = await address.create({
                city: "Kyiv",
                street: "Lva Tolstogo",
            });
            const userData = await user.create({
                name: "John",
                address: addressData._id,
            });

            const data = await user
                .findById(
                    userData._id, 
                    { _id: false, __v: false }, // select
                    // { autopopulate: false } // disables autopopulate
                );

            console.log(data);
        } catch ({ name, message }) {
            console.log(`${name}: ${message}`);
        }
    })
    .catch((error) => {
        console.log('Error:', error);
    });