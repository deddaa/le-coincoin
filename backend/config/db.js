import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import chalk from 'chalk';

dotenv.config();

let db

try {
    
    db = await mysql.createPool({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        database: process.env.DB_NAME
    })

    await db.getConnection();
    console.log(chalk.green("------------------------------------------"));
    console.log(chalk.green("Connexion à la db réussite"));
    console.log(chalk.green("------------------------------------------"));
} catch (error) {
    console.error(chalk.red("------------------------------------------"));
    console.error(chalk.red("Erreur de connexion à la db : ", error));
    console.error(chalk.red("------------------------------------------"));
    process.exit(1);
}

export { db };