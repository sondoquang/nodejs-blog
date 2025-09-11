const Course = require('../models/Course');
const {multipleMongooseToObject} = require('../../utils/mongoose');

class MeController {

    // GET : /news
    storedCourses(req, res, next) {
        Course.find({})
            .then((courses) => {
                res.render("me/stored-courses", {
                    courses: multipleMongooseToObject(courses),
                })
            })
            .catch(next)
    }

    // [GET] /me/trash/courses
    trash (req, res, next) {
        Course.findDeleted({})
            .then((courses) => res.render("me/trash-courses", {
                courses: multipleMongooseToObject(courses),}
            ))
            .catch(next)
    }
}

module.exports = new MeController;