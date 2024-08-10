import express, { Request, Response } from "express";
import { User } from "../schemas/userSchema";

const router = express.Router();

// create a user
router.post("/", async (req: Request, res: Response) => {
	try {
		const newUser = new User(req.body);
		await newUser.save();
		res.status(201).send({ success: true, message: "User Saved in DB!" });
	} catch (error) {
		if (error instanceof Error) {
			console.error(error.message);
		} else {
			console.error("An Unknown Error Occurred!");
			res.status(500).send("Internal Server Error!");
		}
	}
});

export default router;
