const { User, Event } = require("../models");
const router = require("express").Router();
const withAuth = require("../utils/auth");

router.get("/", (req, res) => {
  Event.findAll({
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
      res.render("homepage", { events, loggedIn: req.session.loggedIn });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/event/:id", (req, res) => {
  Event.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ["id", "title", "description"],
    include: [
      {
        model: User,
        attributes: ["username"],
      },
    ],
  })
    .then((dbEventData) => {
      if (!dbEventData) {
        res.status(404).json({ message: "No post found with this ID" });
        return;
      }
      const event = dbEventData.get({ plain: true });
      console.log(event);
      res.render("single-event", {
        event,
        loggedIn: req.session.loggedIn,
        username: req.session.username,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  res.render("login");
});

router.get("/signup", (req, res) => {
  res.render("signup");
});

router.post("/logout", (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

//add withAuth
router.get("/dashboard", withAuth, (req, res) => {
  res.render("dashboard");
});

module.exports = router;
