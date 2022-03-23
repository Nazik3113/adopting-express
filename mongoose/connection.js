import mongoose from "mongoose";

const mongooseOptions = {
    maxPoolSize: 50,
    keepAlive: false,
    connectTimeoutMS: 5000,
};

const connection = mongoose.connect("mongodb://localhost:27017/nazarii", mongooseOptions);

connection
    .then((conn) => {
        console.log("connected");
    })
    .catch((error) => {
        console.log(error);
    });

export default connection;