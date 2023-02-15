const User = require("./User");
const Event = require("./Event");

// Establishes relationship between User and Event models

User.hasMany(Event, {
  foreignKey: "user_id",
});

Event.belongsTo(User, {
  foreignKey: "user_id",
  onDelete: "cascade",
});

module.exports = { User, Event };
