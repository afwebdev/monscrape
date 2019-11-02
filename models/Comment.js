var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var commentSchema = new Schema(
  {
    author: {
      type: String
    },
    comment: {
      type: String
    }
  },
  { timestamps: true }
);

var Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
