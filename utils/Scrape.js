const Axios = require("axios");
const URL = "https://www.thebeaverton.com/news/national/";

const Scrape = {
  scrape: async cb => {
    try {
      Axios.get(URL)
        .then(res => {
          cb(res);
        })
        .catch(err => {
          throw err;
        });
    } catch {
      console.log("Err, unable to grab data");
    }
  }
};

module.exports = Scrape;
