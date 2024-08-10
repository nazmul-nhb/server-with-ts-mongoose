import express, { Request, Response, NextFunction } from "express";

const app = express();

const port = process.env.PORT || 3000;

interface ErrorObject extends Error {
	status?: number;
}

// error handler for 404
app.use((req: Request, res: Response, next: Function) => {
	const error: ErrorObject = new Error("Requested URL Not Found!");
	error.status = 404;
	next(error);
});

// final error handler
app.use((error: ErrorObject, req: Request, res: Response, next: NextFunction) => {
	console.error(error);
	res.status(error.status || 500).send({
		message: error.message || "Internal Server Error!",
	});
});

app.listen(port, () => {
	console.log(`Server is Running on Port: ${port}`);
});
