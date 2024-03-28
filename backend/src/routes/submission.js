const express = require("express")
const router = express.Router()
const { SubmissionController } = require("../controllers");
router.post("/addSubmission", Authmiddleware,upload, SubmissionController.AddSubmission)

module.exports = router