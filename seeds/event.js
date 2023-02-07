const { Event } = require("../models");

const eventData = [
  {
    title: "Sadie's Bday",
    description: "House show with Consec, Mutant Strain and No Uniform",
    event_time: "",
    venue: "145 Conrad St",
    user_id: 1,
  },
  {
    title: "Invertebrates ATL show",
    description:
      "Invertebrates play ATL on tour with Richmond Vampire, ConSec and Burning Question",
    event_time: "",
    venue: "Innerspace",
    user_id: 2,
  },
  {
    title: "Lasso in Athens",
    description: "Lasso plays in Athens on tour from Brazil with Consec",
    event_time: "",
    venue: "Buvez",
    user_id: 3,
  },
];

const seedEvents = () => Event.bulkCreate(eventData);

module.exports = seedEvents;
