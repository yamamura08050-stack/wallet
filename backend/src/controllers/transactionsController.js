
import { sql } from "../config/db.js"

export const getTransactionsByUserId = async (req, res) => {
    try {
        const { userId } = req.params;

        //DBからuserIdで履歴をtransactionsに代入。日付が新しい順で。
        const transactions = await sql`
        SELECT * FROM transactions WHERE user_id = ${userId} ORDER BY created_at DESC
        `

        res.status(200).json(transactions);//フロントにtransactionsをjsonで渡す。

    } catch (error) {
        console.error("Error fetching transactions", error);
        res.status(500).json({message: "Internal server error"});
    }
};

export const getBalanceByUserId = async (req, res) => {
    try {
        const { userId } = req.params;
        const { startDate, endDate } = req.query;

        // balance
        const balanceResult = await sql`
            SELECT COALESCE(SUM(amount), 0) as balance 
            FROM transactions 
            WHERE user_id = ${userId}
            ${startDate ? sql`AND created_at >= ${startDate}` : sql``}
            ${endDate ? sql`AND created_at <= ${endDate}` : sql``}
        `;

        // income
        const incomeResult = await sql`
            SELECT COALESCE(SUM(amount), 0) as income
            FROM transactions
            WHERE user_id = ${userId}
            ${startDate ? sql`AND created_at >= ${startDate}` : sql``}
            ${endDate ? sql`AND created_at <= ${endDate}` : sql``}
            AND amount > 0
        `;

        // expenses
        const expensesResult = await sql`
            SELECT COALESCE(SUM(amount), 0) as expenses
            FROM transactions
            WHERE user_id = ${userId}
            ${startDate ? sql`AND created_at >= ${startDate}` : sql``}
            ${endDate ? sql`AND created_at <= ${endDate}` : sql``}
            AND amount < 0
        `;

        res.status(200).json({
            balance: balanceResult[0].balance,
            income: incomeResult[0].income,
            expenses: expensesResult[0].expenses,
        });

    } catch (error) {
        console.error("Error getting the balance", error);
        res.status(500).json({ message: "Internal server error" });
    }
};



export const createTransaction = async (req, res) => {
    try { 
        const {userId, title, amount, category_id, payment_method_id, location, created_at} = req.body;

        if(!userId || !title || !amount || !category_id || !payment_method_id || !location ) {
            return res.status(501).json({message: "All field required"})
        };

        const dateValue = created_at ? new Date(created_at) : new Date();

        const transaction = await sql`
        INSERT INTO transactions (user_id, title, amount, category_id, payment_method_id, location, created_at)
        VALUES (${userId}, ${title}, ${amount}, ${category_id}, ${payment_method_id}, ${location}, ${dateValue})
        RETURNING *
        `
        res.status(201).json(transaction[0]);
        console.log(transaction)

    } catch (error) {
        console.error("Error creating transaction", error);
        res.status(500).json({message:"Internal server error"});
    }
};

export const createCategory = async (req, res) => {
    try {
        const { category, userId } = req.body;

        if(!userId || !category) return res.status(400).json({message:"All field required"});

        const result = await sql `
            INSERT INTO categories (name, user_id) VALUES (${category}, ${userId}) RETURNING *
            ` 
        res.status(201).json(result[0]);//配列で帰ってくるから0を指定して中身だけ取り出しておく
        console.log(result[0]);

    } catch (error) {
        console.log("Error creating category", error);
        res.status(500).json({message:"Internal server error"});
    }
};

export const createPaymentMethod = async (req, res) => {
    try {
        const { payment_method, userId } = req.body;

        //入力不足の場合は400
        if(!userId || !payment_method) return res.status(400).json({message: "All field required"});

        const result = await sql `
            INSERT INTO payment_methods (name, user_id) VALUES (${payment_method}, ${userId}) RETURNING *
            `
        res.status(201).json(result[0]);
        console.log(result[0]);

    } catch (error) {
        console.error("Error creating payment method", error);
        res.status(500).json({message:"Internal server error"});
    }
};

export const editTransaction = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, amount, payment_method_id, category_id, location, created_at} = req.body;

        if(isNaN(Number(id))) {
            return res.status(400).json({message:"Invailed transaction Id"});
        };

        if(!title || !amount || !payment_method_id || !category_id || !location) {
            return res.status(400).json({message:"All field required"});
        };

        const dateValue = created_at ? new Date(created_at) : new Date();

        const current = await sql `SELECT * FROM transactions WHERE id = ${id}`;
        if(current.length === 0) return res.status(404).json({message:"Not found"});
        const old = current[0];

        const updated = {
            //左がnull,undefinedの時右使う。変更されたところだけ更新っていう意味。
            title: title ?? old.title,
            amount: amount ?? old.amount,
            payment_method_id: payment_method_id ?? old.payment_method_id,
            category_id: category_id ?? old.category_id,
            location: location ?? old.location,
            created_at: created_at ? new Date(created_at) : old.created_at,
        };

        const result = await sql `
        UPDATE transactions 
        SET
            title = ${updated.title},
            amount = ${updated.amount},
            payment_method_id = ${updated.payment_method_id},
            category_id = ${updated.category_id},
            location = ${updated.location},
            created_at = ${updated.created_at}
        WHERE id = ${id}
        RETURNING *;
        `;

        if(result.length === 0) {
            return res.status(404).json({message:"Not found"});
        }

        res.status(200).json({message: "Transaction updated successfully",
                              transaction: result[0]
        });

    } catch (error) {
        console.error("Error updating the transaction", error);
        res.status(500).json({message:"Internal server error"});
    }
};

export const deleteTransactionById = async (req, res) => {
    try {
        const { id } = req.params;

        if(isNaN(Number(id))) {
            return res.status(400).json({message:"Invalid transaction Id"});
        };

        const result = await sql`
            DELETE FROM transactions WHERE id = ${id} RETURNING *
        `;

        if(result.length === 0) {
            return res.status(404).json({message: "Transaction is not found"});
        };

        res.status(200).json({message:"Transaction deleted successfuly", 
                              deleted: result[0]});

    } catch (error) {
        console.log("Error deleting the transaction", error);
        res.status(500).json({message:"Internal server error"});
    }
}; 