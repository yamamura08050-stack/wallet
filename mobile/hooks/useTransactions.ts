import { View, Text } from 'react-native'
import React, { useCallback, useState } from 'react'

const API_URL = "http://localhost:5001/api"

export const useTransactions = (userId? : string) => {

    interface Transaction {
        id: number;
        user_id: string;
        title:string;
        amount: number;
        payment_method_id?: number;
        location?: string;
        category_id?: number;
        created_at: string;
    };

    interface Balance {
        balance: number;
        income: number;
        expenses: number;
    };

    interface FetchBalanceParams  {
        userId: string | undefined;
        startDate: string | null;
        endDate: string | null;
    };

    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [balance, setBalance] = useState<Balance>({
        balance: 0,
        income: 0,
        expenses: 0,
    });

    const [isLoading, setIsLoading] = useState(true);

    const fetchTransactions = useCallback(async () => {
        try {
            const response = await fetch(`${API_URL}/transactions/${userId}`);
            const data = await response.json();
            setTransactions(data);
        } catch (error) {
            console.log("Error fetching transactions:", error)
        }
    }, [userId])

    
    // const fetchSummary = useCallback(async () => {
    //     try {
    //         const response = await fetch(`${API_URL}/transactions/balance/${userId}`);
    //         const data = await response.json();
    //         setBalance(data);
    //     } catch (error) {
    //         console.error("Error fetching balance:", error)
    //     }
    // }, [userId]);


    const fetchBalance = useCallback(async({ startDate, endDate, userId }: FetchBalanceParams) => {
        try {
            const query = new URLSearchParams();

            if (startDate) query.append("startDate", startDate);
            if (endDate) query.append("endDate", endDate);

            const response = await fetch(
                `http://localhost:3000/api/balance/${userId}?${query.toString()}`
            );

            if(!response.ok) {
                throw new Error("Failed to fetch balance data");
            }

            const data = await response.json();
            console.log("balance data:", data);

            setBalance(data.balance);

        } catch (error) {
            console.error("Error fetching balance:", error)
        }
    }, [userId])

    const loadData = useCallback(async () => {
        if(!userId) return;

        setIsLoading(true);
        try {
            await Promise.all([fetchTransactions(), fetchBalance({userId, startDate: null, endDate: null})]);
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setIsLoading(false);
        }
    }, [userId]);

  return {transactions, balance, fetchBalance, loadData}
}
