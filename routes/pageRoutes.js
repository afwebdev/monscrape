const express = require("express");
const router = express.Router();

/* GET home page. */
router.get("/", function(req, resp, next) {
  resp.render("index", { jsSource: "/js/index.js", layout: "main" });
});

router.get("/article/:id", (req, resp, next) => {
  resp.render("article", { jsSource: "/js/article.js", layout: "main" });
});

//

module.exports = router;
