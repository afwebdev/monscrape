$(document).ready(function() {
  $(".sidenav").sidenav();

  //Get current location URL.
  let articleId = window.location.pathname.replace("/article/", "");

  fetch(`/api/article/${articleId}`)
    .then(res => res.json())
    .then(article => {
      //Fill Article Info
      $("#articleTitle").text(article.title);
      $("#articleInfo").text(article.description);
      $("#articleLink").attr({ href: article.link });

      //Fill Comment Section

      let deleteComment = (articleId, commentId) => {
        fetch(`/api/article/${articleId}/comment/${commentId}`, {
          method: "PUT"
        }).then((window.location = "/"));
      };

      //Delete Event Listener
      $(document).on("click", "#deleteButton", e => {
        let commentId = e.currentTarget.dataset.id;
        deleteComment(articleId, commentId);
      });

      article.comments.forEach(comment => {
        console.log(comment);
        $(".collection").append(`
        <li class="collection-item">
          <span id="commentAuthor"><i
              class="userIcon fas fa-user"></i>${comment.author}</span>
           <p id="commentText">${comment.userComment}</p>
        <a id="deleteButton" data-id=${comment._id} class="deleteComment right">DELETE</a>
      </li>`);
      });
    });
});
