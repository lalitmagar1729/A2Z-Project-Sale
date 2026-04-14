require("dotenv").config();
var exe = require("../models/db.js");

exports.getAdminDashboard = (req, res, next) => {
  try {
    res.render("admin/home");
  } catch (error) {
    next(error);
  }
};

