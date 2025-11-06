import express from "express";
import dotenv from "dotenv";
import transactionsRoutes from "./src/routes/transactionsRoutes.js";
import { initDB } from "./src/config/db.js";


dotenv.config;

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5001;

app.use("/api/transactions", transactionsRoutes);

//npm run dev するとデータベースが初期化されてサーバーが起動する。
initDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on PORT:${PORT}`)
    });
});


