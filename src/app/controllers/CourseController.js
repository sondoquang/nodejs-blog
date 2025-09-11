const Course = require("../models/course");
const { mongooseToObject } = require("../../utils/mongoose");


class CourseController {

    // Method: GET || url:/:slug ||
    detail =  async (req, res) => {
        try {
            const newCourse = await Course.findOne({ slug: req.params.slug });
            if (!newCourse) {
                return res.status(404).send({})
            }
            return res.render("detail", { course: mongooseToObject(newCourse) });
        }catch (error) {
            return res.status(400).send({error})
        }
    }

    // CREATE: GET
    create = async (req, res) => {
        res.render("course/create");
    }

    // /courses/store
    store = async (req, res) => {
        try {
            let formData = req.body;
            formData.img = `https://i.ytimg.com/vi/${formData.videoId}/hqdefault.jpg`;
            const newCourse = new Course(formData);
            await newCourse.save();
            return res.redirect("/");
        } catch (error) {
            return res.status(400).send({ error });
        }
    }
}

module.exports = new CourseController;