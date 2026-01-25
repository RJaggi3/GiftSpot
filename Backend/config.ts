import dotenv from "dotenv";

dotenv.config();

function requiredEnv(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Missing required environment variable: ${name}`);
  return value;
}

export const config = {
  mongoUri: requiredEnv("MONGO_URI"),
  jwtSecret: requiredEnv("JWT_SECRET"),
  port: Number(process.env.PORT ?? 5000),
};

export default config;
