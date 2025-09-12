import {NextFunction, Request, Response} from "express";
import {ICourse} from "../models/Course";
import Course from '../models/Course';
import { multipleMongooseToObject } from '../../utils/mongoose';

class SiteController {

    // [GET]: /
    index = async (req: Request, res:Response) => {
        try {
            let courses = await Course.find({})
            courses = multipleMongooseToObject<ICourse>(courses)
            res.render("home", {courses});
        }catch (err) {
            res.status(500).send({error: err})
        }
    }

    // GET: /search
    search(req: Request, res: Response) {
        res.render('search');
    }

}

export default new SiteController;