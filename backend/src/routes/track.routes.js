const express = require("express");
const router = express.Router();

const trackController = require("../controllers/track.controller");
const authMiddleware = require("../middleware/auth.middleware");

router.post("/", authMiddleware, trackController.trackFeature);

module.exports = router;