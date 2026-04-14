var express = require("express");
var router = express.Router();

var userController = require("../controllers/userController");

router.get("/", userController.getUserHome);

router.get("/about", userController.getUserAbout);

router.get("/projectlist", userController.getUserProjectList);

router.get("/contact", userController.getUserContact);

module.exports = router;