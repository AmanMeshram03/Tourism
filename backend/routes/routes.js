import { Router } from "express";
import axios from "axios";

const router = Router();

import { getIndex } from "./index.page.js";
import { Languages } from "../schema models/translate.schema.js";
import { encodedParams, postMethod } from "./translate.page.js";

router.route("/")
    .get(async (req, res) => {
        res.render("home");
    })
    router.route("/guide")
    .get(async (req, res) => {
        res.render("guide");
    })

router.route("/translate")
    .get(async (req, res) => {
        const found = await Languages.find();
        res.render("translate", { languages: found });
    })

    .post(async (req, res) => {

        const found = await Languages.find();

        if (!req.body.translateText) {
            console.log("Empty translate field.");
            return res.render("translate", { languages: found, trans: null, translateText: null, from: req.body.from, to: req.body.to });
        }

        encodedParams.set('from', req.body.from);
        encodedParams.set('to', req.body.to);
        encodedParams.set('text', req.body.translateText);

        const result = (await axios.request(postMethod)).data;

        res.render("translate", { languages: found, trans: result.trans, translateText: req.body.translateText, from: req.body.from, to: req.body.to });
    })



router.route("/login")
    .get(async (req, res) => {
        if (req.cookies.user != null) {
            res.redirect("/home");
        } else {
            res.render("login", { user: null });
        }
    })

    .post(async (req, res) => {
        try {
            const { username, password } = req.body;

            if (!username || !password) {
                res.status(422).render("login", { message: "Fill all the credentials!", user: null });
            }

            else {
                const checkUser = await User.findOne({ username: username });

                if (checkUser) {
                    const matchPassword = await bcrypt.compare(password, checkUser.password);

                    res.cookie("user", checkUser._id.toString(), {
                        expires: new Date(Date.now() + 25982000000), // 30 days.
                        httpOnly: true
                    });

                    if (matchPassword) {
                        res.status(200).redirect("/home");
                    } else {
                        res.status(400).render("login", { message: "Incorrect username or password!", user: null });
                    }
                }
                else {
                    res.status(400).render("login", { message: "Incorrect username or password!", user: null });
                }
            }

        } catch (error) {

        }
    })

export default router;