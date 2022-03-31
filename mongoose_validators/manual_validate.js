import mongoose from "mongoose";

const schema = new mongoose.Schema({
    age: {
        type: Number,
        min: 21,
        max: [99, "To old("],
    }
});

const User = mongoose.model("User", schema);

const user = new User({
    age: 36,
});

await user.validate();