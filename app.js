import dotenv from "dotenv";
dotenv.config({ path: "./config.env" });

import express from "express";
import { fileURLToPath } from "url";
import { dirname } from "path";
import cookieParser from "cookie-parser";

import connectMongoose from "./backend/database/database.js";
import router from "./backend/routes/routes.js";
import { getLanguages } from "./backend/routes/translate.page.js";

import user from "./backend/routes/user.js";
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.static(`${__dirname}/public`));
app.set("view engine", "ejs")
app.set("views", `${__dirname}/views`);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(router);
app.use(user);

async function connectToMongoDB() {
    await connectMongoose();
}
connectToMongoDB();

getLanguages();

app.listen(process.env.PORT, (req,res) => {
    console.log(`Listening on the port ${process.env.PORT}.`);
})