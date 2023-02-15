const seedUsers = require("./user");
const seedEvents = require("./event");

const sequelize = require("../config/connection");

// Runs functions to seed both user and event tables in the database

const seedAll = async () => {
  await sequelize.sync({ force: true });
  await seedUsers();
  await seedEvents();
  process.exit(0);
};

seedAll();
