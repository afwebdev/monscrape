const createError = require("http-errors");
const express = require("express");
const path = require("path");
const logger = require("morgan");
const exphbs = require("express-handlebars");
const mongoose = require("mongoose");

const indexRouter = require("./routes/pageRoutes");
const usersRouter = require("./routes/users");
const apiRouter = require("./routes/apiRoutes");

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/beavertonscraper", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true //Server Discovery/Monitor
});

const app = express();

app.listen(process.env.PORT || 3000, () => {
  console.log(`App listening on port ${process.env.PORT || 3000}`);
});

// view engine setup
app.engine("hbs", exphbs({ defaultLayout: "main", extname: ".hbs" }));
app.set("view engine", "hbs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/api", apiRouter);

app.use("/users", usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
