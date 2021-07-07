import * as fs from 'fs-extra';
const path = require('path');

export function getTypes() {
    return (fs.readdirSync(path.join(__dirname, 'templates'), { withFileTypes: false }) as string[]).map(
        (item) => item.split('.')[0],
    );
}
