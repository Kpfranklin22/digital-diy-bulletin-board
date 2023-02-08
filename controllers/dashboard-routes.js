const router = require("express").Router();
const sequelize = require("../config/connection");
const {User, Event } = require("../models");
const withAuth = require("../utils/auth");

//Add withAuth once auth.js is complete
router.get("/",(req, res) => {
    Event.findAll({
        where: {
            user_id: req.session.user_id
        },
        attributes: ['id', 'title', 'description', 'event_time', 'venue', 'created_at'],
        include: [{
            model: User,
            attributes: ['username']
        }]
    }).then((dbEventData)=>{
        const events = dbEventData.map(event => event.get({plain: true}));
        res.render('dashboard', {events, loggedIn: true});
    }).catch(err=>{
        console.log(err);
        res.status(500).json(err);
    });
});

//Add withAuth once auth.js is complete
router.post("/", (req, res)=>{
})

module.exports = router;
