import { Document } from "mongoose";

export function multipleMongooseToObject<T extends Document>(docs: T[]): any[] {
    return docs.map(doc => doc.toObject());
}

export function mongooseToObject<T extends Document>(doc: T | null): any {
    return doc ? doc.toObject() : doc;
}