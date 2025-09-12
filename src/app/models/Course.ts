import mongoose, { Schema, Document } from "mongoose";
import mongooseDelete, {SoftDeleteDocument,SoftDeleteModel,} from "mongoose-delete";
import slug from 'mongoose-slug-generator';

mongoose.plugin(slug);

// Interface cho Course
export interface ICourse extends Document, SoftDeleteDocument {
    name: string;
    desc?: string;
    img?: string;
    videoId: string;
    slug?: string;
    createdAt?: Date;
    updatedAt?: Date;
    deleted?: boolean;
    deletedAt?: Date;
}

// MODEL: Course
const CourseSchema = new Schema<ICourse>({
    name: {type: String, required: true, maxLength: 255},
    desc: {type: String, maxLength: 600},
    img: {type: String, maxLength: 255},
    videoId: {type: String, maxLength: 100, required: true},
    slug: {type: String, slug: 'name'},
}, {
    timestamps: true
});

CourseSchema.plugin(mongooseDelete, { overrideMethods: 'all', deletedAt: true , validateBeforeRestore: true});
type CourseModelType = SoftDeleteModel<ICourse>;
const Course = (mongoose.models.Course as CourseModelType) ||
    mongoose.model<ICourse, CourseModelType>("Course", CourseSchema);

export default Course;