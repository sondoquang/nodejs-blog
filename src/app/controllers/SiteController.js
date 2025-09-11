
const course = require('../models/Course');
const { multipleMongooseToObject } = require('../../utils/mongoose');

class SiteController {

    // GET || url: / || ( home page )
    index = async (req, res) => {
        try {
            let courses = await course.find({})
            courses = multipleMongooseToObject(courses)
            res.render("home", {courses});
        }catch (err) {
            res.status(500).send({error: err})
        }
    }

    // GET: /search
    search(req, res) {
        res.render('search');
    }

}

module.exports = new SiteController;