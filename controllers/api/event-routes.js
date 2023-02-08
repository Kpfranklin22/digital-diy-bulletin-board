const router = require("express").Router();
const { User, Event } = require("../../models");
const sequelize = require("../../config/connection");
// const withAuth = require("../../utils/auth");

router.get("/", (req, res) => {
  // Event.Findall({})
  Event.findAll({
    attributes: ['id', 'title', 'description', 'event_time', 'venue', 'created_at'],
    order: [["created_at", "DESC"]],
    include: [
      {
        model: "user",
        attributes: ["username"]
      }
    ]
  }).then((dbEventData)=> res.json(dbEventData.reverse())).catch((err)=>{
    console.log(err);
    res.status(500).json(err);
  })
});

router.get("/:id", (req, res) => {
  // Event.findOne({})
  Event.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ['id', 'title', 'description', 'event_time', 'venue', 'created_at'],
    include: [{
      model: "user",
      attributes: ["username"]
    }]
  }).then((dbEventData)=>{
    if (!dbEventData){
      res.status(404).json({message:"No event with this ID!"});
      return;
    }
    res.json(dbEventData)
  }).catch(err=>{
    console.log(err);
    res.status(500).json(err);
  })
});

module.exports = router;
