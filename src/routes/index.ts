import newsRouter from "./news";
import siteRouter from "./site";
import courseRouter from "./course";
import meRouter from "./me";

function route(app: any) {
    app.use("/news", newsRouter);
    app.use("/me", meRouter);
    app.use("/courses", courseRouter);
    app.use("/", siteRouter)
}

export default route;