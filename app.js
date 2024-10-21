import cookieParser from "cookie-parser";
import { config } from "dotenv";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import errorMiddleware from "./middleware/error.middleware.js";
import multer from "multer";
import dynamicRoute from "./routes/common.routes.js";
import inquiryRoute from "./routes/inquiry.routes.js";
import adminRouter from "./routes/admin.routes.js";
config();

// Initialize Express app
const app = express();

// Multer setup for file uploads
const upload = multer({ dest: "uploads/" });

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:3000",
      "http://localhost:5174",
      "https://freelance.webakash1806.com",
      "https://ayush.webakash1806.com",
      "https://ucscab.com",
      "https://master.ucscab.com",
    ],
    credentials: true,
  })
);
app.use(morgan("dev"));


// Rotes

app.use("/api/v1/dynamic",dynamicRoute)
app.use("/api/v1/inquiry",inquiryRoute)
app.use("/api/v1/admin",adminRouter)

// // Routes
// app.use("/api/v1/user", userRouter);
// app.use("/api/v1/admin", adminRoute);
// app.use("/api/v1/city/rate", cityRate);
// app.use("/api/v1/oneway/booking", oneWayBookingRoute);
// app.use("/api/v1/discount", discountRoute);
// app.use("/api/v1/local", localCategoryRoute);
// app.use("/api/v1/airpot", airpotRoute);
// app.use("/api/v1/chart", chart);
// app.use("/api/v1/tc", termRoute);
// app.use("/api/v1/payment", PayementRouter);

// app.use("/api/v1/mode", paymentModeRoute);

// // Route for adding round category with file upload
// app.use("/api/v1/round", roundRouter);
// app.use("/api/v1/oneway", oneWayRouter);

// app.use("/api/v1/distance", distanceRoute);

// app.get("/api/v1/invoice/:id", generateInvoice);
// app.use("/api/v1/dynamic", dynamicRoute);
// app.use("/api/v1/inquiry", inquiryRoute);
// app.use("/api/v1/vendor", vendorRoute);

// Default route
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Server is running and ready.",
  });
});

// Catch-all route for undefined endpoints
app.all("*", (req, res) => {
  res.status(404).json({
    success: false,
    status: 404,
    message: "Oops! Not Found",
  });
});

// Error handling middleware
app.use(errorMiddleware);

export default app;
