$(document).ready(function() {
  $(".sidenav").sidenav();
  $(".modal").modal();

  //Get current location URL.
  let articleId = window.location.pathname.replace("/article/", "");

  fetch(`/api/article/${articleId}`)
    .then(res => res.json())
    .then(article => {
      console.log(article);
      //Fill Article Info
      $("#articleTitle").text(article.title);
      $("#articleInfo").text(article.description);
      $("#articleLink").attr({ href: article.link });

      let deleteComment = (articleId, commentId) => {
        fetch(`/api/article/${articleId}/comment/${commentId}`, {
          method: "PUT"
        }).then((window.location = window.location.pathname));
      };

      //Delete Event Listener
      $(document).on("click", "#deleteButton", e => {
        let commentId = e.currentTarget.dataset.id;
        deleteComment(articleId, commentId);
      });

      //Submit Comment Listener
      $("#submitForm").on("submit", e => {
        e.preventDefault();
        let author = e.currentTarget[0].value;
        let userComment = e.currentTarget[1].value;
        fetch(`/api/article/${articleId}`, {
          method: "POST",
          body: JSON.stringify({
            author: author,
            userComment: userComment
          }),
          headers: {
            "Content-Type": "application/json"
          }
        })
          .then(res => res.json())
          .then((window.location = window.location.pathname));
      });

      //New Comment Modal
      $("#newCommentModal").click(e => {
        console.log("heelo");
      });

      article.comments.forEach(comment => {
        console.log(comment);
        if (comment)
          $(".collection").append(`
        <li class="collection-item">
          <span id="commentAuthor"><i
              class="userIcon fas fa-user"></i>${comment.author}</span>
           <p id="commentText">${comment.userComment}</p>
        <a id="deleteButton" data-id=${comment._id} class="deleteComment right">DELETE</a>
      </li>`);
      });
    })
    .catch(console.error());
});
