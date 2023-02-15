const router = require("express").Router();
const apiRoutes = require("./api");
const homeRoutes = require("./home-routes.js");

// Assigns address to API and Home routes

router.use("/api", apiRoutes);
router.use("/", homeRoutes);
router.use((req, res) => {
  res.status(404).end();
});
module.exports = router;
