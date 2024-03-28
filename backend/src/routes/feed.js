const express = require('express');
const router = express.Router();

const { FeedController } = require("../controllers")

const { Authmiddleware } = require("../middleware")

router.get("/feedDetails",Authmiddleware,FeedController.FeedDetails);

module.exports = router;