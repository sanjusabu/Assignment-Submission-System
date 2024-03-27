const express = require("express")
const router = express.Router()

router.post("/addSubmission", Authmiddleware,upload, SubmissionController.AddSubmission)

module.exports = router