const express = require('express');
const router = express.Router();

const { FeedController } = require("../controllers")

const { Authmiddleware } = require("../middleware")

router.get("/feed",Authmiddleware,FeedController.FeedDetails);

module.exports = router;