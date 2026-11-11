
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import propertyRouter from "./routes/property.routes.js";
import userRouter from "./routes/user.routes.js";

dotenv.config();

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Health check
app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
    message: "LocalHost API is running",
  });
});

// Property routes
app.use("/api/properties", propertyRouter);

app.use("/api/users", userRouter);
// Test route
app.post("/api/test", (req, res) => {
  const data = req.body;

  console.log("Received data:", data);

  res.status(201).json({
    message: "Data received successfully",
    data,
  });
});


// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
