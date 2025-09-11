const Course = require("../models/course");
const { mongooseToObject } = require("../../utils/mongoose");


class CourseController {

    // [GET]: /:slug
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

    // [GET]: /course/create
    create = async (req, res) => {
        res.render("course/create");
    }

    // [POST]: /courses/store
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

    // [PUT] : /courses/:id
    update = async (req, res, next) => {
        const _id = req.params.id;
        try {
            await Course.updateOne({ _id: _id }, req.body)
            res.redirect("/me/stored/courses");
        }catch (error) {
            return res.status(400).send({ error });
        }
    }

    // [GET] :  /courses/:id/edit
    edit = async (req, res, next) => {
        Course.findById(req.params.id)
            .then(course => res.render("course/edit", {course: mongooseToObject(course)}))
            .catch(next)
    }

    // [DELETE]: /courses/:id
    destroy = async (req, res, next) => {
        const _id = req.params.id;
        Course.delete({ _id: _id })
            .then((_) => res.redirect("/me/stored/courses"))
            .catch(next)
    }
}

module.exports = new CourseController();