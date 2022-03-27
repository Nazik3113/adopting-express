import mongoose from "mongoose";
import connection from "../mongoose/connection.js";

connection
    .then(async () => {
        const userSchema = new mongoose.Schema({
            name: String,
            orders: {type: [mongoose.SchemaTypes.ObjectId], ref: 'orders'},
        });

        const ordersSchema = new mongoose.Schema({
            product: String,
        });

        const user = mongoose.model("customers", userSchema, "customers");

        const order = mongoose.model("orders", ordersSchema, "orders");

        const [orderData, orderDataTwo] = await Promise.all([            
            order.create({product: "Oranges"}),
            order.create({product: "Bananas"}),
        ]);

        const usersData = await user.create({
            name: "John Doe",
            orders: [orderData._id, orderDataTwo],
        });

        const data = await user
            .findById(usersData._id)
            .select('-_id')
            .populate({
                path: 'orders', 
                match: { product: { $in: ["Oranges", "Bananas"] } }, // optional
                select: '-_id -__v',  // optional
                options: {
                    limit: 5, // optional
                    sort: { product: 1 } // optional
                }, // optional
                model: order, // optional, can be used in different connection
            });

        console.log(data);
    })
    .catch((error) => {
        console.error("Error:", error);
    });