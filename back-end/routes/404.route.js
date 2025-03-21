import express from 'express'; 

import {notFoundPage} from "../controllers/404.controller.js"

const router = express.Router();

router.get("*",notFoundPage)

export default router;