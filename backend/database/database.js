import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config({ path: "./config.env"});

async function connectMongoose() {
    const response = await mongoose.connect(process.env.DATABASE_URL);

    console.log(`Connected to MongoDB Atlas on ${response.connection.host}`);
}

export default connectMongoose;