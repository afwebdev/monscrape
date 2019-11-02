const express = require("express");
const router = express.Router();
const Scraper = require("../utils/Scrape");
const db = require("../models");
const cheerioHelper = require("../utils/Cheerios");

//returns JSON, (scraped data from Beaverton)
router.get("/scrape", (req, resp, next) => {
  Scraper.scrape(res => {
    //get JSON returned back from custom cheerio iteration helper.
    let data = cheerioHelper(res.data);
    db.Article.insertMany(data, { ordered: false }, (err, docs) => {
      if (err) {
        //Existing articles exist. Unique Constraint enforced on title
        console.log(err);
      }
      resp.json(docs);
    });
    // .then(result => {
    //   resp.json(result);
    // })
    // .catch(err => {
    //   resp.json({ error: err });
    // });
  });
});

//GET ALL ARTICLES route, return JSON.
router.get("/articles", (req, resp, next) => {
  db.Article.find((err, data) => {
    resp.json(data);
  }).catch(err => {
    //return err info
    resp.json(err);
  });
});

//MAKE A COMMENT, API ROUTE
router.post("/article/:id", (req, resp, next) => {
  let id = req.params.id;
  let data = ({ post, author, comment } = req.body);
  console.log(data);

  //Create the comment, and push to article comments array
  //and push to the matching id article documents, comments array.
  db.Comment.create(data)
    .then(data => {
      return db.Article.findOneAndUpdate({ _id: id }, { $push: { comments: data._id } }, { new: true });
    })
    .then(articleComments => {
      resp.json(articleComments);
    })
    .catch(err => {
      //return err info
      resp.json(err);
    });
});

//REMOVE COMMENT FROM COMMENTS ARRAY OF ARTICLE,
// REQ.BODY.ID HOLDS COMMENT ID
//Removes the selected comment from the article collections comments array,
//Leaves the original comment stored in comment collection for records.
router.put("/article/:id", (req, resp) => {
  let _id = req.params.id;
  db.Article.findByIdAndUpdate({ _id }, { $pull: { comments: req.body.id } }, { new: true }).then(res => {
    resp.json(res);
  });
});

//GET SINGLE ARTICLE DATA,
//Gets single article data with populated comments array
router.get("/article/:id", (req, res) => {
  console.log(req.params.id);
  db.Article.findOne({ _id: req.params.id })
    .populate("comments")
    .then(article => {
      res.json(article);
    })
    .catch(err => {
      //return err info
      res.json(err);
    });
});

module.exports = router;
