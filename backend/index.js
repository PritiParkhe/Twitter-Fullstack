import express from "express";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import router from "./routes/userRoute.js";
import messageRouter from "./routes/messageRoutes.js";

import storyRoutes from "./routes/storyRoutes.js";
dotenv.config({
  path: ".env",
});

const app = express();
const PORT = process.env.PORT || 8000;
const FRONTEND_URL = process.env.FRONTEND_URL;

app.use(
  cors({
    origin: FRONTEND_URL,
    credentials: true,
  })
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// API routes
app.use("/api", router);
app.use("/api", storyRoutes);
app.use("/api/messages", messageRouter);

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server listening at ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to the database:", err);
  });

export default app;
