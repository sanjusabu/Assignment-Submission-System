const express = require("express")
const router = express.Router()
const { SubmissionController } = require("../controllers");
const { Authmiddleware,Upload } = require("../middleware");
router.post("/addSubmission", Authmiddleware,Upload, SubmissionController.AddSubmission)

module.exports = router