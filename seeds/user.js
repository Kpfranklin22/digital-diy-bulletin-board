const { User } = require("../models");

const userData = [
  {
    username: "Sal",
    email: "salgoodman@hotmail.com",
    password: "password123",
  },
  {
    username: "Mike",
    email: "mikehunt@gmail.com",
    password: "password123",
  },
  {
    username: "Anita",
    email: "anitasigg@aol.com",
    password: "password123",
  },
  {
    username: "Kyle",
    email: "kpfranklin22gmail.com",
    password: "admin123",
  },
  {
    username: "Hugh",
    email: "hughmannity@gmail.com",
    password: "password321",
  },
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;
