import { errorLog, successLog, spacer } from './logs';
import * as ejs from 'ejs';
import * as fs from 'fs-extra';
const path = require('path');

interface GeneratorInterface {
    type: string;
    name: string;
    out: string;
}

export function generate({ type, name, out }: GeneratorInterface) {
    ejs.renderFile(path.join(__dirname, `templates/${type}.ejs`), { name }, {}, function (err, str) {
        // Rendered code string
        if (err) {
            errorLog(err.message);
        }

        // Write file to --out path
        try {
            const outputFile = path.join(process.cwd(), out);
            fs.ensureFileSync(outputFile);
            fs.outputFileSync(outputFile, str);
            successLog(`file created successfully at '${out}'`);
            spacer();
        } catch (err) {
            errorLog(err.message);
        }
    });
}
