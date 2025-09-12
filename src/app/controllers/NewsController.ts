import {NextFunction, Request, Response} from "express";


class NewsController {

    // GET : /news
    index(req: Request, res: Response, next: NextFunction) {
        res.render('news');
    }

    // GET: /news/:slug
    show(req: Request, res: Response, next: NextFunction) {
        res.send('New Detail');
    }

}

export default new NewsController;