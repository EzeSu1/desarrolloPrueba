import  HealthController from "../controllers/healthController.js"
import {errorHandler} from "../middlewares/errorHandler.js"
import express from "express"

const router = express.Router()


router.route("/")
    .get(HealthController.checkHealth)



router.use(errorHandler)

export default router