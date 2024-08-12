import express, { Request, Response } from "express";
import { User } from "../schemas/userSchema";

const router = express.Router();

// create a user
router.post("/", async (req: Request, res: Response) => {
	try {
		const newUser = new User(req.body);
		const result = await newUser.save();
		if (result._id) {
			return res
				.status(201)
				.send({ success: true, message: "User Saved in DB!" });
		}
	} catch (error) {
		if (error instanceof Error) {
			if ((error as any).code === 11000) {
				res.status(400).send({
					success: false,
					message: "Please, Use A Different Email!",
				});
			} else {
				const errorMessageParts = error.message.split(": ");
				const message =
					errorMessageParts.length > 1
						? errorMessageParts[errorMessageParts.length - 1]
						: error.message;
				res.status(400).send({
					success: false,
					message,
				});
			}
			console.error(error.message);
		} else {
			console.error("An Unknown Error Occurred!");
			res.status(500).send({
				success: false,
				message: "Internal Server Error!",
			});
		}
	}
});

// get all users
router.get("/", async (req: Request, res: Response) => {
	try {
		const result = await User.find({});

		return res.status(200).send(result);
	} catch (error) {
		if (error instanceof Error) {
			console.error(error.message);
			res.status(400).send({
				success: false,
				message: error.message,
			});
		} else {
			console.error("An Unknown Error Occurred!");
			res.status(500).send({
				success: false,
				message: "Internal Server Error!",
			});
		}
	}
});

export default router;
