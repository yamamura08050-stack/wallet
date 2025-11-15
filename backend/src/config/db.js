import { neon } from "@neondatabase/serverless";
import "dotenv/config";


export const sql = neon(process.env.DATABASE_URL);

export async function initDB() {
    try {

        await sql `CREATE TABLE IF NOT EXISTS categories (
            id SERIAL PRIMARY KEY,
            user_id VARCHAR(255) NOT NULL,
            name VARCHAR(255) NOT NULL
        )`;

        await sql `CREATE TABLE IF NOT EXISTS payment_methods (
            id SERIAL PRIMARY KEY,
            user_id VARCHAR(255) NOT NULL,
            name VARCHAR(255) NOT NULL
        )`;

        await sql `CREATE TABLE IF NOT EXISTS transactions (
            id SERIAL PRIMARY KEY,
            user_id VARCHAR(255) NOT NULL,
            title VARCHAR(255) NOT NULL,
            amount DECIMAL(10, 2) NOT NULL,
            payment_method_id INT REFERENCES payment_methods(id),
            location VARCHAR(255),
            category_id INT REFERENCES categories(id),
            created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        )`;
        
        console.log("DB initialized successfuly")
    } catch (error) {
        console.log("Error initialized DB")
        process.exit(1);
    }
};

