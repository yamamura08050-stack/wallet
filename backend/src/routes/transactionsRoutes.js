import express from "express";
import { createCategory, createPaymentMethod, createTransaction, deleteTransactionById, editTransaction, getBalanceByUserId, getTransactionsByUserId } from "../controllers/transactionsController.js";

const router = express.Router();

router.get("/:userId", getTransactionsByUserId);
router.get("/balance/:userId", getBalanceByUserId);
router.post("/", createTransaction);
router.post("/categories", createCategory);
router.delete("/:id", deleteTransactionById);
router.post("/payment-method", createPaymentMethod);
router.patch("/:id", editTransaction); //送ったカラムだけ更新


export default router;


