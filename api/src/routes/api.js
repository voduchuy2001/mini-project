import express from "express";
import RegisterController from "../controllers/auth/RegisterController";

const router = express.Router();

const initAPIRoutes = (app) => {
    router.post('/register', RegisterController.register);

    return app.use('/api', router);
};

module.exports = initAPIRoutes;