import app from "./app.js";
import chalk from "chalk";

const PORT  = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(chalk.green("------------------------------------------"));
    console.log(chalk.green(`Serveur lancé sur le port ${PORT}`));
    console.log(chalk.blue("http://localhost:" + PORT));
    console.log(chalk.green("------------------------------------------"));
})