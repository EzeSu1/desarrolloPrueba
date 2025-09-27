import  HealthController from "../controllers/healthController.js"
import {errorHandler} from "../middlewares/errorHandler.js"
import express from "express"


const router = express.Router()




router.route("/")
    .get((req, res) => {
        HealthController.checkHealth(req, res)
})


// npm run start:development
router.use(errorHandler)
export default router