const seedUsers = require('./user');
const seedEvents = require('./event');

const sequelize = require('../config/connection');

const seedAll = async() => {
    await sequelize.sync({ force: true });
    await seedUsers();
    await seedEvents();
    process.exit(0);
};

seedAll();
