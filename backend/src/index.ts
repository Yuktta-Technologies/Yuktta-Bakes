import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import productRoutes from "./routes/products";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());


app.use("/api/products", productRoutes);

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
