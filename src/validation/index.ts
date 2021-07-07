import { errorLog } from '../logs';
const isVarName = require('is-valid-var-name');

export interface ValidationInterface {
    name: string;
}

export function _nameValidation(text: string) {
    if (!isVarName(text)) {
        errorLog('name is not a valid javascript class name');
        process.exit(1);
    }
}

export function validation({ name }: ValidationInterface) {
    _nameValidation(name);
}
