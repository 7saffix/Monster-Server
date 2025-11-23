import express from "express";
import { router } from "./routes";
import { globalErrorHandler } from "./middlewares/globalErrorHandler";
import { NotFound } from "./middlewares/notFound";

const app = express();
app.use(express.json());

app.use("/api/v1", router);

app.use(globalErrorHandler);
app.use(NotFound);

export default app;
