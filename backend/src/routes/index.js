const express = require("express");

const FeedRoutes= require("./feed")
const AssignmentRoutes= require("./assignment")
const UserRoutes= require("./user")
const SubRoutes= require("./submission")

const router = express.Router();

router.use("/users", UserRoutes);
router.use("/assignments", AssignmentRoutes);
router.use("/submissions", SubRoutes);
router.use("/feed", FeedRoutes);

module.exports = router