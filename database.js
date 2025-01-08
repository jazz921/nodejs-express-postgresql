import pg from "pg";
const { Pool } = pg;
import dotenv from "dotenv";

dotenv.config(); // This library automatically configure the env files for the project

// Connecting to the database (from vercel postgreSQL)
const pool = new Pool({
    connectionString: process.env.POSTGRES_URL,
});

// Get All Accounts
export async function getAccounts() {
    const client = await pool.connect();
    try {
        const query = {
            name: "select-all-accounts",
            text: "SELECT * FROM accounts",
        };
        const { rows } = await client.query(query);
        return rows;
    } catch (error) {
        console.log(error);
    } finally {
        client.release();
    }
}

// Get Single Account
export async function getAccount(id) {
    const client = await pool.connect();

    try {
        const query = {
            name: "select-account",
            text: "SELECT * FROM accounts WHERE id = $1",
            values: [id],
        };
        const { rows } = await client.query(query);
        return rows[0];
    } catch (error) {
        console.log(`Error getting account from the database: ${error}`);
    } finally {
        client.release();
    }
}

// Inserting a single account
export async function createAccount(username, email, password) {
    const client = await pool.connect();
    try {
        const query = {
            name: "insert-account",
            text: "INSERT INTO accounts (username, email, password) VALUES ($1, $2, $3)",
            values: [username, email, password],
        };
        const res = await client.query(query);
        return res.rows[0];
    } catch (error) {
        console.log(`Error inserting data to the database: ${error}`);
    } finally {
        client.release();
    }
}

export async function editAccountPassword(id, newPassword) {
    const client = await pool.connect();

    try {
        const query = {
            name: "update-password",
            text: "UPDATE accounts SET password = $2 WHERE id = $1",
            values: [id, newPassword],
        };

        const res = await client.query(query);
        console.log(`Updated User's Password Succesfully: ${res.command}`);
        return true;
    } catch (error) {
        console.log(`Error updating account password: ${error}`);
        return false;
    } finally {
        client.release();
    }
}

export async function editAccountUsername(id, newUsername) {
    const client = await pool.connect();

    try {
        const query = {
            name: "update-username",
            text: "UPDATE accounts SET username = $2 WHERE id = $1",
            values: [id, newUsername],
        };

        const res = await client.query(query);
        console.log(`Updated User's Password Succesfully: ${res.command}`);
        return true;
    } catch (error) {
        console.log(`Error updating account username: ${error}`);
        return false;
    } finally {
        client.release();
    }
}

export async function deleteAccount(id) {
    const client = await pool.connect();

    try {
        const query = {
            name: "delete-account",
            text: "DELETE FROM accounts WHERE id = $1",
            values: [id],
        };

        const res = await client.query(query);
        console.log(`Updated User's Password Succesfully: ${res.command}`);
        return true;
    } catch (error) {
        console.log(`Error deleting account: ${error}`);
        return false;
    } finally {
        client.release();
    }
}

// const accounts = await getAccounts();
// console.log(accounts);

// const account = await getAccount(22);
// console.log(account);

// const insert = await insertAccount('postgres1', 'postgres@gmail.com', '1234566789')
// console.log(insert)

// const editPass = await editAccountPassword(28, '22222333222')
// console.log(editPass)
