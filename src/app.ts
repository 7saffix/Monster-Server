import express from "express";
import cookieParser from "cookie-parser";
import { router } from "./routes";
import { globalErrorHandler } from "./middlewares/globalErrorHandler";
import { NotFound } from "./middlewares/notFound";

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use("/api/v1", router);

app.use(globalErrorHandler);
app.use(NotFound);

export default app;
