import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema({
    name: {type: String, required: true, alias: "firstName"},
    sex: {type: String, enum: ["m", "f"], required: true, index: true},
    array: [Number],
    mixed: mongoose.SchemaTypes.Mixed,
    map: Map,
    number: Number,
    decimal128: mongoose.SchemaTypes.Decimal128,
    date: Date,
    setter: {type: Number, set: num => num * 100}
});

export { userSchema };