import express from 'express';
import { getMessage, sendMessage } from '../Controllers/messages.controllers.js';
import protectRoute from '../Middleware/protectRoute.js';
const router = express.Router()

router.post("/send/:id" , protectRoute , sendMessage)
router.get("/:id" , protectRoute , getMessage)

export default router