const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');

export function errorLog(text: string) {
    console.log(chalk`{red.bold Error:} {red ${text}}`);
}

export function warnLog(text: string) {
    console.log(chalk`{yellow.bold Warning:} {yellow ${text}}`);
}

export function infoLog(text: string) {
    console.log(chalk`{cyan.bold Info:} {cyan ${text}}`);
}

export function successLog(text: string) {
    console.log(chalk`{green.bold Success:} {green ${text}}`);
}

export function spacer() {
    console.log('\n');
}

export function welcomeLog() {
    clear();
    console.log(chalk.yellow(figlet.textSync('dpgen', { horizontalLayout: 'full' })));
    spacer();
}
