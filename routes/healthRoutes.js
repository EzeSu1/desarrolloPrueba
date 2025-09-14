import  HealthController from "../controllers/healthController.js"
import express from "express"

const router = express.Router()


const pathHealth = "/health-check"

router.get(pathHealth, (req, res) => {
    HealthController.checkHealth(req, res)
})


// npm run start:development

export default router