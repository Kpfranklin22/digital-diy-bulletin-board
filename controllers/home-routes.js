const { User, Event } = require("../models");
const router = require("express").Router();
const withAuth = require("../utils/auth");

//Selects all events from database as well as their associated users, then renders them on the homepage.
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

//Renders the login page if the user is not logged in

router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  res.render("login");
});

//Renders the signup page

router.get("/signup", (req, res) => {
  res.render("signup");
});

// Ends current session

router.post("/logout", (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

// Renders the "create event" page

router.get("/dashboard", withAuth, (req, res) => {
  res.render("new-event");
});

module.exports = router;
