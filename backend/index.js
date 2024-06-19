import express from 'express';
import connectDB from './config/db.js';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import router from './routes/userRoute.js';

dotenv.config({
  path: ".env"
});

const app = express();
const PORT = process.env.PORT;

app.use(express.urlencoded({
  extended: true
}));

app.use(express.json());
app.use(cookieParser());

// API routes
app.use("/api", router);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`server listening at ${PORT}`);
  });
}).catch(err => {
  console.error('Failed to connect to the database:', err);
});
