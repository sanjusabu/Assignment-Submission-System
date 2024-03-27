const express = require('express');
const router = express.Router();
const upload = require("../middleware/multer.js");
const { Authmiddleware } = require("../middleware");
const { AssignController } = require("../controllers");

router.get("/getAssignmentDetails",Authmiddleware,AssignController.GetAssignmentDetails)
router.post("/createAssignment",upload,Authmiddleware,AssignController.CreateAssignment);
router.patch("/updateAssignment",Authmiddleware,AssignController.UpdateJournal);
router.delete("/deleteAssignment",Authmiddleware,AssignController.DeleteJournal);

module.exports = router;