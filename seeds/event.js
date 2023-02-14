const { Event } = require("../models");

const eventData = [
  {
    title: "Sadie's Bday",
    description: "House show with Consec, Mutant Strain and No Uniform",
    event_time: "2/11/2023",
    venue: "145 Conrad St",
    user_id: "1",
  },
  {
    title: "Invertebrates ATL show",
    description:
      "Invertebrates play ATL on tour with Richmond Vampire, ConSec and Burning Question",
    event_time: "3/7/2023",
    venue: "Innerspace",
    user_id: "2",
  },
  {
    title: "Lasso in Athens",
    description: "Lasso plays in Athens on tour from Brazil with Consec",
    event_time: "5/25/2023",
    venue: "Buvez",
    user_id: "3",
  },
];

const seedEvents = () => Event.bulkCreate(eventData);

module.exports = seedEvents;
