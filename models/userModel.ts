import { Document, model, Schema } from "mongoose";

interface UserType extends Document {
	name: string;
	email: string;
	createdAt: Date;
}

export const userSchema = new Schema<UserType>({
	name: {
		type: String,
		required: [true, "You Must Provide Your Name!"],
	},
	email: {
		type: String,
		required: [true, "You Must Provide Your Email!"],
		unique: true,
	},
	createdAt: { type: Date, default: Date.now },
});

export const User = model<UserType>("User", userSchema);
