import mongoose from "mongoose";

const schema = new mongoose.Schema({
    phone: {
        type: Number,
        required: [true, "Phone is required."],
    },
});

const validator = (value) => {
    return /\d{3}-\d{3}-\d{4}/.test(value);
};

schema.path("phone").validate(validator, `{VALUE} is not a valid phone number!`);

const Phone = mongoose.model("phones", schema);

const phone = new Phone({
    phone: "380-343-2324"
});