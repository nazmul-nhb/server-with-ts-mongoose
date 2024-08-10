import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import { connectDB } from "./db/testDB";
import dotenv from "dotenv";
import userRoutes from "./routes/users";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/users", userRoutes);

interface ErrorObject extends Error {
	status?: number;
}

app.get("/", async (req: Request, res: Response) => {
	res.send("Test Server is Running!");
});

// error handler for 404
app.use((req: Request, res: Response, next: Function) => {
	const error: ErrorObject = new Error("Requested URL Not Found!");
	error.status = 404;
	next(error);
});

// final error handler
app.use(
	(error: ErrorObject, req: Request, res: Response, next: NextFunction) => {
		console.error(error);
		res.status(error.status || 500).send({
			message: error.message || "Internal Server Error!",
		});
	}
);

// run the server along with DB
const run = async () => {
	await connectDB();

	app.listen(port, () => {
		console.log(`Server is Running on Port: ${port}`);
	});
};

run().catch(console.dir);

// app.listen(port, async () => {
// 	console.log(`Server is Running on Port: ${port}`);
// 	await connectDB();
// });
