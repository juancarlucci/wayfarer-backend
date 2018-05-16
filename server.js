var express = require("express");
var app = express();
var db = require("./models/index.js");
var bodyParser = require("body-parser"),
  passport = require("passport");
const config = require("./config");
var cors = require("cors");
// Configure app
app.set("views", __dirname + "/views"); // Views directory
app.use(express.static("public")); // Static directory
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false })); // req.body
//Yo Abdelhalim this is the response to the test!
// Set CORS Headers
// app.use(function(req, res, next) {
//     req.header('Access-Control-Allow-Headers','*');
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept,Token,token,Authorization');
//     res.header('Access-Control-Allow-token');
//     next();
// });
app.use(cors());
app.use(passport.initialize());
const localSignupStrategy = require("./passport/local-signup");
const localLoginStrategy = require("./passport/local-login");
const authCheckMiddleware = require("./config/auth");
passport.use("local-signup", localSignupStrategy);
passport.use("local-login", localLoginStrategy);
app.use("/api", authCheckMiddleware);
//basic root route
const authRoutes = require("./routes/auth");
const apiRoutes = require("./routes/api");
const cityRoutes = require("./routes/city");
const postRoutes = require("./routes/post");
app.use("/auth", authRoutes);
app.use("/api", apiRoutes);
app.use("/city", cityRoutes);
app.use("/api", postRoutes);
app.get("/", function(req, res) {
  res.json({ message: "woooow" });
});

app.listen(process.env.PORT || 3000, function() {
  console.log("server running");
});
