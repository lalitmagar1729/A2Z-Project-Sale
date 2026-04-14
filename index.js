var express = require("express");
var bodyParser = require("body-parser");

var userRouter = require("./routes/userRouter.js");
var adminRouter = require("./routes/adminRouter.js");

var app = express();

app.set("view engine", "ejs");
app.set("views", "./views");
app.use(express.static("public/"));
app.use(bodyParser.urlencoded({ extended: true }));


app.use("/", userRouter);
app.use("/admin", adminRouter);

app.use((req, res, next) => {
    res.status(404).render("404");
});

app.use((err, req, res, next) => {
  console.error("Route:", req.method, req.originalUrl);
  console.error("Message:", err.message);
  console.error("Stack:", err.stack);
  res.status(err.status || 500).render("500");
});

app.listen(3000, () => {
    console.log("Server started on http://localhost:3000");
});