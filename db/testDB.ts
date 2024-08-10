import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const connectDB = async () => {
	try {
		await mongoose.connect("mongodb://127.0.0.1:27017/testWithTsMongoose");
		console.log("DB is Connected!");
	} catch (error) {
		if (error instanceof Error) {
			console.error(error.message);
		} else {
			console.error("An Unknown Error Occurred!");
		}
		console.log("DB is not Connected!");
		process.exit(1);
	}
};
