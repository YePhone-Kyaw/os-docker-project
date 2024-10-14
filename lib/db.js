import { Pool } from "pg";

// import { PrismaClient } from "@prisma/client";

export const pool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
})

export default async function db() {
    await pool.connect((err, client, release) => {
        if(err) {
            return console.error("Error in connection", err.stack)
        } 
        client.query("SELECT NOW()", (err, result) => {
            release();
            if (err) {
                return console.error("Error in query execution", err.stack);
            }
            console.log("Connected to database.");
        })
    })
}


module.exports = pool;
