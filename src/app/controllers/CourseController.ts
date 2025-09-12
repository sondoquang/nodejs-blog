import {NextFunction, Request, Response} from "express";
import Course, {ICourse} from "../models/Course";
import { mongooseToObject } from "../../utils/mongoose";
import { CourseCreateBody } from "../type/Course";


type SlugParams = { slug: string };
type IdParams = { id: string };

class CourseController {

    // [GET]: /:slug
    detail =  async (req: Request<SlugParams>, res: Response) => {
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
    create = async (req: Request, res: Response) => {
        res.render("course/create");
    }

    // [POST]: /courses/store
    store = async (req: Request<unknown, unknown, CourseCreateBody>, res: Response) => {
        try {
            let formData = {... req.body };
            formData.img = `https://i.ytimg.com/vi/${formData.videoId}/hqdefault.jpg`;
            const newCourse = new Course(formData);
            await newCourse.save();
            return res.redirect("/");
        } catch (error) {
            return res.status(400).send({ error });
        }
    }

    // [PUT] : /courses/:id
    update = async (req: Request<IdParams, unknown, CourseCreateBody >, res: Response) => {
        const _id = req.params.id;
        try {
            await Course.updateOne({ _id: _id }, req.body)
            res.redirect("/me/stored/courses");
        }catch (error) {
            return res.status(400).send({ error });
        }
    }

    // [GET] :  /courses/:id/edit
    edit = async (req: Request<IdParams>, res: Response, next: NextFunction) => {
        Course.findById(req.params.id)
            .then((course: ICourse) => res.render("course/edit", {course: mongooseToObject<ICourse>(course)}))
            .catch(next)
    }

    // [DELETE]: /courses/:id
    destroy = async (req: Request<IdParams>, res:Response, next:NextFunction) => {
        const _id = req.params.id;
        Course.delete({ _id: _id })
            .then(() => res.redirect("/me/stored/courses"))
            .catch(next)
    }
}

export default new CourseController();