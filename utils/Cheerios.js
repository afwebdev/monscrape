let Cheerio = require("cheerio");

const Cheerios = data => {
  let $ = Cheerio.load(data);
  let newsDataArray = [];

  $("article .row").each((index, element) => {
    let date = $(element)
      .children()
      .last()
      .children(".post-author")
      .children()
      .text()
      .trim();

    let title = $(element)
      .children()
      .last()
      .children(".post-title")
      .text()
      .trim();

    let description = $(element)
      .children()
      .last()
      .children(".post-content")
      .children("p")
      .text()
      .trim();

    let link = $(element)
      .children()
      .last()
      .children(".post-title")
      .children("h3")
      .children()
      .attr("href");

    newsDataArray.push({ date, title, description, link });
  });
  return newsDataArray;
};

module.exports = Cheerios;
