import mongoose from "mongoose";

const translateSchema = new mongoose.Schema({
    code: String,
    language: String
})

const Languages = mongoose.model("Language", translateSchema);

export { Languages };