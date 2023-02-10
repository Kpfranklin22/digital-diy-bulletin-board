const router = require("express").Router();
const { User, Event } = require("../../models");
const withAuth = require("../../utils/auth");

router.get("/", (req, res) => {
  Event.findAll({
    attributes: ['id', 'title', 'description', 'event_time', 'venue', 'created_at'],
    order: [["created_at", "DESC"]],
    include: [
      {
        model: User,
        attributes: ["username"]
      }
    ]
  }).then((dbEventData)=> res.json(dbEventData)).catch((err)=>{
    console.log(err);
    res.status(500).json(err);
  })
});

router.get("/:id", (req, res) => {
  Event.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ['id', 'title', 'description', 'event_time', 'venue', 'created_at'],
    include: [{
      model: User,
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

//add withAuth back in once auth.js completed
router.post('/', (req, res)=>{
  Event.create({
    title: req.body.title,
    description: req.body.description,
    event_time: req.body.event_time,
    venue: req.body.venue,
    img_source: req.body.img_source,
  }).then(dbEventData => res.json(dbEventData)).catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

//add withAuth back in once auth.js completed
router.delete("/:id", (req, res) => {
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
