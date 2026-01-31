import { Router, type Request, type Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import config from "../config";
import User from "../models/User";

const router = Router();

type AuthBody = {
  username?: string;
  password?: string;
};

// Register
router.post("/register", async (req: Request, res: Response) => {
  const { username, password } = (req.body ?? {}) as AuthBody;

  if (!username || !password) {
    return res.status(400).json({ msg: "username and password are required" });
  }

  try {
    const existing = await User.findOne({ username });
    if (existing) {
      return res.status(400).json({ msg: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    const user = await User.create({ username, password: hashed });

    const payload = { user: { id: user.id } };
    const token = jwt.sign(payload, config.jwtSecret, { expiresIn: "1h" });

    return res.json({ token });
  } catch (err) {
    console.error(err);
    return res.status(500).send("Server Error");
  }
});

// Login
router.post("/login", async (req: Request, res: Response) => {
  const { username, password } = (req.body ?? {}) as AuthBody;

  if (!username || !password) {
    return res.status(400).json({ msg: "username and password are required" });
  }

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const payload = { user: { id: user.id } };
    const token = jwt.sign(payload, config.jwtSecret, { expiresIn: "1h" });

    return res.json({ token });
  } catch (err) {
    console.error(err);
    return res.status(500).send("Server Error");
  }
});

export default router;

