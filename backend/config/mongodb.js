import mongoose from 'mongoose';
import dotenv from 'dotenv';
import chalk from 'chalk';

dotenv.config();

const connectMongo = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log(chalk.green("------------------------------------------"));
        console.log(chalk.green("Connexion à la db mongo réussite"));
        console.log(chalk.green("------------------------------------------"));
    } catch (error) {
        console.error(chalk.red("------------------------------------------"));
        console.error(chalk.red("Erreur de connexion à la db mongo : ", error));
        console.error(chalk.red("------------------------------------------"));
        process.exit(1);
    }
}

export default connectMongo