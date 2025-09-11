const express = require('express');
const router = express.Router();
const newsController = require('../app/controllers/MeController');



router.get("/stored/courses", newsController.storedCourses)
router.get("/trash/courses", newsController.trash)

module.exports = router;