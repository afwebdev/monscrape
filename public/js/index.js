$(document).ready(function() {
  $(".sidenav").sidenav();

  let $loader = `
  <div id="loaderWrapper">
  <div class="preloader-wrapper active">
  	<div class="spinner-layer spinner-red-only">
		<div class="circle-clipper left">
		 	<div class="circle"></div>
		</div><div class="gap-patch">
	  <div class="circle"></div>
	</div><div class="circle-clipper right">
	  <div class="circle"></div>
	</div>
  </div>
</div>
</div>`;

  $(".articleContainer").prepend($loader);

  fetch("/api/scrape").then(() => {
    fetch("/api/articles")
      .then(res => res.json())
      .then(articles => {
        console.log("hello");
        articles.forEach(article => {
          let { _id, date, description, link, title } = article;

          let colItem = $("<li>").addClass("collection-item");

          let commentIcon = $("<i>")
            .addClass(["material-icons", "commentIcon"])
            .text("comment");

          let saveIcon = $("<i>")
            .addClass(["material-icons", "saveIcon"])
            .text("grade");

          let commentAnchor = $("<a>")
            .attr({ href: `/article/${_id}`, "data-id": _id })
            .addClass("secondary-content")
            .append(commentIcon);

          let saveAnchor = $("<a>")
            .attr({ href: "#" })
            .addClass("secondary-content")
            .append(saveIcon);

          let linkSpan = $("<a>")
            .addClass("readmore")
            .attr({ href: link })
            .append("<span>")
            .text("Read More");
          let dateSpan = $("<span>")
            .addClass("dateSpan")
            .text(date);
          let descriptionParagraph = $("<p>")
            .text(description)
            .append(linkSpan);
          let titleH5 = $("<h5>").text(title);

          $(".articleCol").append(colItem.append([saveAnchor, commentAnchor, dateSpan, titleH5, descriptionParagraph]));
          $("#loaderWrapper").remove();
          $(".articleCol").fadeIn(1200);
        });
      });
  });
});
