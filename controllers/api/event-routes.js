const router = require("express").Router();
const { Post, User, Comment } = require("../../models");
const sequelize = require("../../config/connection");
const withAuth = require("../../utils/auth");

router.get("/", (req, res) => {
// Event.Findall({})
});
router.get("/:id", (req, res) => {
// Event.findOne({})
});



module.exports = router;