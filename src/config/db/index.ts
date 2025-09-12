import mongoose from 'mongoose';
export async function connect (): Promise<void> {
    try {
        await mongoose.connect('mongodb://localhost:27017/education_dev');
        console.log("Connect to MongoDB successfully!");
    }catch(err) {
        console.error("Connect failed !!!",err);
    }
}
