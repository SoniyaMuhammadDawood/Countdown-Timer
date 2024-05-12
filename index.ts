#!/usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
import { differenceInSeconds } from "date-fns";

async function startTimer() {
    const ans = await inquirer.prompt([
        {
            name: "userInput",
            type: "input",
            message: (chalk.bold.bgYellowBright(" 😎 Please input the time in seconds ⏲️  ")),
            validate: (input) => {
                if (isNaN(input)) {
                    return "Please enter a valid number";
                } else if (input >= 60) {
                    return "Seconds must be less than 60";
                } else {
                    return true;
                }
            }
        }
    ]);

    const userInput = parseInt(ans.userInput);
    let remainingSeconds = userInput;

    const interval = setInterval(() => {
        const minutes = Math.floor(remainingSeconds / 60);
        const seconds = remainingSeconds % 60;   
        console.log(`${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`);
        remainingSeconds--;

        if (remainingSeconds < 0) {
            clearInterval(interval);
            console.log(chalk.bold.bgRedBright(` 😊 Timer has expired  ⌛  `));
            process.exit();
        }
    }, 1000);
}

startTimer();
