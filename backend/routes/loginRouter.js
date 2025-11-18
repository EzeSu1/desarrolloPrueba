import  LoginController from "../controllers/loginController.js"
import express from "express"
import {errorHandler} from "../middlewares/errorHandler.js";


const router= express.Router()


router.route("/login")
    .post(LoginController.loguear)

router.route("/register")
    .post(LoginController.registrar)

router.route("/logout")
    .post(LoginController.logout)



router.use(errorHandler)

export default router;