import { Request, Response } from "express";
import { authenticateAdmin } from "../services/admin.service";

export async function adminLogin(req: Request, res: Response) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password required" });
  }

  const result = await authenticateAdmin(email, password);

  if (!result) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  res.json({
    token: result.token,
    admin: {
      id: result.admin.id,
      email: result.admin.email,
      name: result.admin.name,
    },
  });
}
