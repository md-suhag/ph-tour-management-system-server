import express from "express";
import { router } from "./app/routes";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.status(200).json({
    message: "welcome to tour management sever",
  });
});

app.use("/api/v1", router);
export default app;
