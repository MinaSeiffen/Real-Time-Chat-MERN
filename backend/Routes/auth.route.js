import express from 'express';
const router = express.Router()
import {loginUser , signUp, logoutUser} from "../Controllers/auth.controllers.js"

router.post('/login' , loginUser)

router.post('/logout' ,logoutUser)

router.post('/signup' , signUp)

export default router