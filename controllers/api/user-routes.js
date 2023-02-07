const router = require("express").Router();
const { User, Post, Comment } = require("../../models");


router.get("/", (req, res) => {
//User.findALL({})
});

router.get("/:id", (req, res) => {
//User.findOne({})
});


module.exports = router;