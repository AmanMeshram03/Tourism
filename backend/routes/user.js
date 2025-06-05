import express from "express";
import router from "./routes";

import { signup , login} from "../controller/user";

router.post('/login', login).
router.post('/signup', signup).

module.export= router;
