import mongoose from "mongoose";

const schema = new mongoose.Schema({
    phone: {
        type: Number,
        validate: {
            validator: (value) => {
                return /\d{3}-\d{3}-\d{4}/.test(value);
            },
            message: props => `${props.value} is not a valid phone number!`,
        },
        required: [true, "Phone is required."],
    },
});

const Phone = mongoose.model("phones", schema);

const phone = new Phone({
    phone: "380-343-2324"
});