import mongoose from "mongoose";
import connection from "../mongoose/connection.js";

const versioningPlugin = (schema, options) => {
    schema.post("findOneAndUpdate", async (doc) => {
        doc.increment();
        await doc.save();
    });
};

connection
    .then(async (conn) => {
        const addressesSchema = mongoose.Schema({
            city: String,
            street: String,
        });

        const userSchema = mongoose.Schema({
            name: String,
            address: {
                type: mongoose.SchemaTypes.ObjectId,
                ref: "addresses",
                required: true,
            },
        });

        userSchema.plugin(versioningPlugin);

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

            await user
                .findByIdAndUpdate(
                    userData._id, 
                    { name: "Nazarii" }, // select
                );

            const userAfterUpdate = await user
                .findById(
                    userData._id, 
                );

            console.log(userAfterUpdate);
        } catch ({ name, message }) {
            console.log(`${name}: ${message}`);
        }
    })
    .catch((error) => {
        console.log('Error:', error);
    });