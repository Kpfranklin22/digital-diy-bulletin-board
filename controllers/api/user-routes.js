const router = require("express").Router();
const { User, Event } = require("../../models");

//Lists all users in database
router.get("/", (req, res) => {
  User.findAll({
    attributes: ["id", "username", "email"],
  })
    .then((dbUserData) => res.json(dbUserData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//Lists each user in database by ID number as well as any events posted by that user.
router.get("/:id", (req, res) => {
  User.findOne({
    attributes: ["id", "username", "email"],
    where: { id: req.params.id },
    include: [
      {
        model: Event,
        attributes: ["id", "title", "event_time", "venue", "created_at"],
      },
    ],
  })
    .then((dbUserData) => {
      if (!dbUserData) {
        res.status(404).json({ message: "No user with that ID!" });
        return;
      }
      res.json(dbUserData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//Creates and assigns attributes to a new user based on input.
//Then saves session data and registers the current user as logged in.
router.post("/", (req, res) => {
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  })
    .then((dbUserData) => {
      req.session.save(() => {
        req.session.user_id = dbUserData.id;
        req.session.username = dbUserData.username;
        req.session.loggedIn = true;

        res.json(dbUserData);
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//Finds a user by username and then validates the entered password by comparing it to
//the password stored in the database for the associated user. Then saves the session
//data and registers the current user as logged in.
router.post("/login", (req, res) => {
  User.findOne({
    where: {
      username: req.body.username,
    },
  })
    .then((dbUserData) => {
      if (!dbUserData) {
        res.status(400).json({ message: "No user with that username!" });
        return;
      }
      const validPwd = dbUserData.checkPassword(req.body.password);

      if (validPwd) {
        res.status(400).json({ message: "Wrong password!" });
        return;
      }
      req.session.save(() => {
        req.session.user_id = dbUserData.id;
        req.session.username = dbUserData.username;
        req.session.loggedIn = true;

        res.json({ user: dbUserData, message: "Logged in successfully!" });
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//Ends current session
router.post("/logout", (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

//Delete route for users to be implemented in future versions of this app. Uses the user ID
//number to select a user to delete.
router.delete("/:id", (req, res) => {
  User.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbUserData) => {
      if (!dbUserData) {
        res.status(404).json({ message: "No user found with this id" });
        return;
      }
      res.json(dbUserData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
