const router = require("express").Router();
const { User, Event } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", withAuth, (req, res) => {
  Event.findAll({
    where: {
      user_id: req.session.user_id,
    },
    attributes: [
      "id",
      "title",
      "description",
      "event_time",
      "venue",
      "created_at",
      "img_source",
    ],
    include: [
      {
        model: User,
        attributes: ["username"],
      },
    ],
  })
    .then((dbEventData) => {
      const events = dbEventData.map((event) => event.get({ plain: true }));
      res.render("dashboard", { events, loggedIn: true });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/new", (req, res) => {
  res.render("new-event", { username: req.session.username });
});

module.exports = router;
