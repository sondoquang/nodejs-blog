declare module "mongoose-slug-generator" {
    import mongoose from "mongoose";

    function slugGenerator(schema: mongoose.Schema): void;

    export default slugGenerator;
}
