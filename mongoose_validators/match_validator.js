import mongoose from "mongoose";

const schema = new mongoose.Schema({
    phone: {
        type: Number,
        match: /\d{3}-\d{3}-\d{4}/,
    },
});

const Phone = mongoose.model("phones", schema);

const phone = new Phone({
    phone: "380-343-2324"
});