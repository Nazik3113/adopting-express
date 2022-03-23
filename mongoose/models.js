import mongoose from "mongoose";
import { userSchema } from "./schemas.js";

const { model } = mongoose;

const User = model("customers", userSchema);

export {User};