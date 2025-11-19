import express from "express";
import dotenv from "dotenv";
import transactionsRoutes from "./src/routes/transactionsRoutes.js";
import { authprotected } from "./src/middleware/authprotect.js";
import { initDB } from "./src/config/db.js";


dotenv.config;

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5001;

app.use("/api/transactions", authprotected, transactionsRoutes);

app.post("/api/publish-token", async (req, res) => {
  const { clerkSessionId } = req.body;

  try {
    const session = await clerkClient.sessions.verifySession(clerkSessionId);
    const userId = session.userId;

    if (!userId) return res.status(401).json({ error: "Unauthorized" });

    const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.json({ token });
  } catch (error) {
    res.status(401).json({error: "Unauthorized"});
  }
});

//npm run dev するとデータベースが初期化されてサーバーが起動する。
initDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on PORT:${PORT}`)
    });
});



