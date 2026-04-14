require("dotenv").config();
var exe = require("../models/db.js");

exports.getUserHome = (req, res, next) => {
  try {
    res.render("user/home");
  } catch (error) {
    next(error);
  }
};

exports.getUserAbout = (req, res, next) => {
  try {
    res.render("user/about");
  } catch (error) {
    next(error);
  }
};

exports.getUserProjectList = (req, res, next) => {
  try {
    res.render("user/projectlist");
  } catch (error) {
    next(error);
  }
};

exports.getUserContact = (req, res, next) => {
  try {
    res.render("user/contact");
  } catch (error) {
    next(error);
  }
};