class HealthController {
    checkHealth(req, res) {
        res.send("ok")
    }
}


export default new HealthController();