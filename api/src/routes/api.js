import express from "express";

const router = express.Router();

const initAPIRoutes = (app) => {

    return app.use('/api/', router);
};

module.exports = initAPIRoutes;