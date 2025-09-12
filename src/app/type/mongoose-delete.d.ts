declare module "mongoose-delete" {
    import mongoose, { Document, Model } from "mongoose";

    export interface SoftDeleteDocument extends Document {
        deleted?: boolean;
        deletedAt?: Date;
        restore: () => Promise<this>;
    }

    export interface SoftDeleteModel<T extends Document> extends Model<T> {
        delete: (conditions: any) => Promise<any>;
        restore: (conditions: any) => Promise<any>;
        findDeleted: (conditions?: any) => Promise<T[]>;
        findOneDeleted: (conditions?: any) => Promise<T | null>;
    }

    function mongooseDelete(schema: mongoose.Schema, options?: any): void;
    export default mongooseDelete;
}
