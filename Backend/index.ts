import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import config from "./config";
import authRoutes from "./routes/auth";

async function main() {
  const app = express();

  app.use(express.json());
  app.use(cors());

  await mongoose.connect(config.mongoUri);
  console.log("MongoDB Connected");

  app.use("/api/auth", authRoutes);

  app.get("/health", (_req, res) => res.json({ ok: true }));

  app.listen(config.port, () => {
    console.log(`Server started on port ${config.port}`);
  });
}

main().catch((err) => {
  console.error("Fatal startup error:", err);
  process.exit(1);
});

