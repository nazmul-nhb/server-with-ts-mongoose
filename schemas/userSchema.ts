import { model, Schema } from "mongoose";

interface UserType {
	name: string;
	email: string;
	createdAt: Date;
}

export const userSchema = new Schema<UserType>({
	name: { type: String, required: true },
	email: { type: String, required: true },
	createdAt: { type: Date, default: Date.now },
});

export const User = model<UserType>("User", userSchema);
