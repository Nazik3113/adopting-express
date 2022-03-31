import mongoose from "mongoose";

const schema = new mongoose.Schema({
    age: {
        type: Number,
        min: 21,
        max: [99, "To old("],
    },
    name: {
        type: String,
        minlength: 2,
        maxlength: 25,
        required: [true, "No name("],
    },
    license: {
        type: String,
        unique: true,
        required: function() {
            return this.age > 21;
        },
    },
    sex: {
        type: String,
        enum: {
            values: ["m", "f"],
            message: "wrong sex"
        }
    },
    dateOfBirth: {
        type: Date,
        min: new Date(1990, 0 ,1),
        max: [Date.now() - 5.6802514 * 1e11, "should be at least 18 y.o"], // 18 years in ms
    }
});

const User = mongoose.model("User", schema);

const user = new User({
    age: 36,
    name: "John",
    license: "AA3232FS",
    sex: "m",
    dateOfBirth: new Date(2002, 12, 31),
});