import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js";
import userRoute from "./routes/user.js";
import hotelRoute from "./routes/hotel.js";
import roomRoute from "./routes/room.js";
const app = express();
dotenv.config();

const mongoConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_CONNECTION_STRING);
    console.log("mongo connected");
  } catch (error) {
    throw error;
  }
};

//midelware
app.use("/api/auth", authRoute);
app.use("/api/auth", userRoute);
app.use("/api/auth", hotelRoute);
app.use("/api/auth", roomRoute);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

app.listen(3000, () => {
  console.log("server connect");
  mongoConnection();
});
