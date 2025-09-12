import Course, {ICourse} from '../models/Course';
import {multipleMongooseToObject} from'../../utils/mongoose';
import {NextFunction, Request, Response} from "express";
import convertDate from "../../utils/DateFormatter";
class MeController {

    // GET : /news
    storedCourses(req: Request, res: Response, next: NextFunction) {
        Course.find({})
            .then((courses: ICourse[]) => {
                res.render("me/stored-courses", {
                    courses: multipleMongooseToObject<ICourse>(courses).map((course: ICourse) => {
                        return {
                            ...course,
                            createdAt: convertDate(course.createdAt ? course.createdAt : '', "DD-MM-YYYY HH:mm:ss"),
                        }
                    })
                })
            })
            .catch(next)
    }

    // [GET] /me/trash/courses
    trash (req: Request, res: Response, next: NextFunction) {
        Course.findDeleted({deleted: true})
            .then((courses: ICourse[]) => res.render("me/trash-courses", {
                courses: multipleMongooseToObject<ICourse>(courses)
                    .map((course: ICourse) => {
                        return {
                            ...course,
                            deletedAt: convertDate(course.deletedAt || '', "DD-MM-YYYY HH:mm:ss")
                        }
                    })
            }
            ))
            .catch(next)
    }

    // [PUT]: /me/courses/:id/restore
    restore (req: Request, res: Response, next: NextFunction) {
        Course.restore({_id: req.params.id})
        .then(() => {
            res.redirect("/me/stored/courses");
        })
        .catch(next)
    }

    // [DELETE] /me/courses/:id
    remove (req: Request, res: Response, next: NextFunction) {
        Course.deleteOne({_id: req.params.id})
            .then(() => {
                res.redirect("/me/stored/courses");
            })
            .catch(next)
    }
}

export default new MeController();