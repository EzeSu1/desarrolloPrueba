class HealthController {
    checkHealth(req, res) {
        res.send("ok")
    }
    /*
    static instance() {
        if (!HealthController.singleton) {
            HealthController.singleton = new HealthController();
        }
        return HealthController.singleton;
    }
    */
}

export default new HealthController();
