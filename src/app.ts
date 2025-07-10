import express from "express";
import { router } from "./app/routes";
import cors from "cors";
import { globalErrorHandler } from "./app/middlewares/globalErrorHandler";
import notFound from "./app/middlewares/notFound";

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.status(200).json({
    message: "welcome to tour management sever",
  });
});

app.use("/api/v1", router);

app.use(notFound);

app.use(globalErrorHandler);
export default app;
