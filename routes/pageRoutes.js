const express = require("express");
const router = express.Router();

/* GET home page. */
router.get("/", function(req, resp, next) {
  resp.render("index", { title: "Express", layout: "main" });
});

//

module.exports = router;
