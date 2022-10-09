import express, { Router } from "express";

import { ReadAction } from "./action";

const router = express.Router();

router.get("/", ReadAction);

export default router;
