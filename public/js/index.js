$(document).ready(function() {
  $(".sidenav").sidenav();

  fetch("/api/articles")
    .then(res => res.json())
    .then(articles => {
      articles.forEach(article => {
        let { date, description, link, title } = article;

        let colItem = $("<li>").addClass("collection-item");
        let saveIcon = $("<i>")
          .addClass("material-icons")
          .text("grade");
        let saveAnchor = $("<a>")
          .attr({ href: "#" })
          .addClass("secondary-content")
          .append(saveIcon);

        let dateSpan = $("<span>").text(date);
        let descriptionParagraph = $("<p>").text(description);
        let titleH5 = $("<h5>").text(title);
        let linkSpan = $("<a>")
          .attr({ href: link })
          .append("<span>")
          .text("Read More");

        $(".articleCol").append(colItem.append([saveAnchor, dateSpan, titleH5, descriptionParagraph, linkSpan]));
      });
    });
});
