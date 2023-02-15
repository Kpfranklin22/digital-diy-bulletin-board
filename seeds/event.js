const { Event } = require("../models");

// Seeds the event table
const eventData = [
  {
    title: "JUGGALO FUNHOUSE SUPERSHOW",
    description:
      "ICP with Special Guests: Phunk Junkies, Kotton Mouth Kings, and Twistid",
    event_time: "9/4/2000",
    venue: "Mammoth Events Center",
    user_id: "1",
    img_source:
      "https://i.pinimg.com/736x/75/e8/2a/75e82ac4e5c5dbebad26a15a61b09e1a--rock-posters-concert-posters.jpg",
  },
  {
    title: "Insane Clown Posse's The Dark Carnival Show",
    description: "With Mac Sabbath, Lyte, Ouija, MC Lars & Sewercide",
    event_time: "3/7/2018",
    venue: "DCG Con @ The Roxy",
    user_id: "2",
    img_source:
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.faygoluvers.net%2Fv5%2Fwp-content%2Fuploads%2F2018%2F05%2F32260570_2019702351434783_2462477412777066496_n.jpg&f=1&nofb=1&ipt=29e53e23277f48b8753c646fbcd253247d65b4bd8e286a39d2dd0eab1b486ae7&ipo=images",
  },
  {
    title: "Gathering of the Juggalos 2022",
    description: "Gathering of the Juggalos, Gathering of Dreams",
    event_time: "8/3/2022",
    venue: "Legend Valley, Ohio",
    user_id: "3",
    img_source:
      "https://static.wixstatic.com/media/85c5d2_3cea441e83e54f578b687894eadae09f~mv2.jpg/v1/fill/w_980,h_1017,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/85c5d2_3cea441e83e54f578b687894eadae09f~mv2.jpg",
  },
];

const seedEvents = () => Event.bulkCreate(eventData);

module.exports = seedEvents;
