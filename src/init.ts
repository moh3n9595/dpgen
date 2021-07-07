import { QUESTIONS } from './constants';
import { welcomeLog } from './logs';
import { getTypes } from './utils';
import { validation } from './validation';

const yargs = require('yargs');
const prompts = require('prompts');

export function init() {
    welcomeLog();

    const { type, name, out } = yargs.options({
        type: { type: 'string', demandOption: false, alias: 't' },
        name: { type: 'string', demandOption: false, alias: 'n' },
        out: { type: 'string', demandOption: false, alias: 'o' },
    }).argv;

    const questions = [
        {
            type: () => (name ? null : 'text'),
            name: 'promptsName',
            message: QUESTIONS.name,
        },
        {
            type: () => (type ? null : 'select'),
            name: 'promptsType',
            message: QUESTIONS.type,
            choices: getTypes().map((typeItem) => ({
                title: typeItem,
                value: typeItem,
            })),
        },
        {
            type: () => (out ? null : 'text'),
            name: 'promptsOut',
            message: QUESTIONS.out,
        },
    ];

    return (async () => {
        // Read input variables
        const { promptsType = type, promptsName = name, promptsOut = out } = await prompts(questions);

        // Validate inputs
        validation({ name: promptsName });

        return Promise.resolve({ type: promptsType, name: promptsName, out: promptsOut });
    })();
}
