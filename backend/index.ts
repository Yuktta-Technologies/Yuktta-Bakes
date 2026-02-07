import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import productRoutes from "./src/routes/products";
import passport from "./src/auth/passport";
import adminRoutes from "./src/routes/admin.routes";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use(passport.initialize());
app.use("/api/admin", adminRoutes);
app.use("/api/products", productRoutes);

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
