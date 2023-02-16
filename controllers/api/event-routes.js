const router = require("express").Router();
const { User, Event } = require("../../models");
const withAuth = require("../../utils/auth");

//Shows all events from database with their attributes as well as the user who posted the event
router.get("/", (req, res) => {
  Event.findAll({
    attributes: [
      "id",
      "title",
      "description",
      "event_time",
      "venue",
      "img_source",
      "created_at",
    ],
    order: [["created_at", "DESC"]],
    include: [
      {
        model: User,
        attributes: ["username"],
      },
    ],
  })
    .then((dbEventData) => res.json(dbEventData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//Shows a single event by it's ID number as well as the user who posted it.
router.get("/:id", (req, res) => {
  Event.findOne({
    where: {
      id: req.params.id,
    },
    attributes: [
      "id",
      "title",
      "description",
      "event_time",
      "venue",
      "img_source",
      "created_at",
    ],
    include: [
      {
        model: User,
        attributes: ["username"],
      },
    ],
  })
    .then((dbEventData) => {
      if (!dbEventData) {
        res.status(404).json({ message: "No event with this ID!" });
        return;
      }
      res.json(dbEventData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//Takes user input to create and assign attributes to a new event.
router.post("/", withAuth, (req, res) => {
    Event.create({
    title: req.body.title,
    description: req.body.description,
    event_time: req.body.event_time,
    venue: req.body.venue,
    img_source: req.body.img_source,
    user_id: req.session.user_id
  })
    .then((dbEventData) => {
      res.json(dbEventData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//Delete route for events to be implemented in future updates to the app.
//Uses event ID number to identify which one is to be deleted.
router.delete("/:id", withAuth, (req, res) => {
  Event.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbEventData) => {
      if (!dbEventData) {
        res.status(404).json({ message: "No event found with this ID" });
        return;
      }
      res.json(dbEventData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
