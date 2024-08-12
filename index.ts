import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./db/testDB";
import userRoutes from "./routes/users";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

(async () => {
	try {
		// connect to db
		await connectDB();

		// middlewares
		app.use(cors());
		app.use(express.json());

		// routes
		app.use("/users", userRoutes);

		interface ErrorObject extends Error {
			status?: number;
		}

		// root route
		app.get("/", async (req: Request, res: Response) => {
			res.send("Test Server is Running!");
		});

		// error handler for 404
		app.use((req: Request, res: Response, next: NextFunction) => {
			const error: ErrorObject = new Error("Requested URL Not Found!");
			error.status = 404;
			next(error);
		});

		// final error handler
		app.use(
			(
				error: ErrorObject,
				req: Request,
				res: Response,
				next: NextFunction
			) => {
				console.error(error);
				res.status(error.status || 500).send({
					message: error.message || "Internal Server Error!",
				});
			}
		);

		// run the server
		app.listen(port, () => {
			console.log(`Server is Running on Port: ${port}`);
		});
	} catch (error) {
		console.error("Failed to Start the Server: ", error);
		// process.exit(1);
	}
})();

export default app;
