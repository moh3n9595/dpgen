import { exec, spawn } from 'child_process';
import { QUESTIONS } from './constants';

afterEach(() => {
    exec('rm -rf test.js');
});

jest.setTimeout(10000);

const interactiveCli = (args: string[]): Promise<string> => {
    return new Promise((resolve) => {
        const p = spawn('./node_modules/.bin/ts-node', args);
        p.stdin.setDefaultEncoding('utf-8');
        let [type, name, out] = [false, false, false];
        let output = '';

        p.stdout.on('data', (data) => {
            if (data.toString().includes(QUESTIONS.name) && !name) {
                name = true;
                p.stdin.write('test');
                p.stdin.write('\x0A');
            } else if (data.toString().includes(QUESTIONS.type) && !type) {
                type = true;
                p.stdin.write('\x0A');
            } else if (data.toString().includes(QUESTIONS.out) && !out) {
                out = true;
                p.stdin.write('test.js');
                p.stdin.write('\x0A');
            }
            output += data.toString();
        });

        setTimeout(() => {
            resolve(output);
        }, 4000);
    });
};

describe('init & generate', () => {
    it('args should print the correct output', (done) => {
        exec('./node_modules/.bin/ts-node ./src/index.ts --type=test --name=test --out=test.js', (error, stdout) => {
            done(expect(stdout.includes('Success')).toBeTruthy());
        });
    });

    it('alias should print the correct output', (done) => {
        exec('./node_modules/.bin/ts-node ./src/index.ts --t=test --n=test --o=test.js', (error, stdout) => {
            done(expect(stdout.includes('Success')).toBeTruthy());
        });
    });

    it('interactive should print the correct output', (done) => {
        interactiveCli(['./src/index.ts']).then((output) => {
            done(expect(output.includes('Success')).toBeTruthy());
        });
    });

    it('combination of interactive and args should print the correct output', (done) => {
        interactiveCli(['./src/index.ts', '--type=test']).then((output) => {
            done(expect(output.includes('Success')).toBeTruthy());
        });
    });

    it('combination of interactive and args should print the correct output', (done) => {
        interactiveCli(['./src/index.ts', '--name=test']).then((output) => {
            done(expect(output.includes('Success')).toBeTruthy());
        });
    });

    it('combination of interactive and args should print the correct output', (done) => {
        interactiveCli(['./src/index.ts', '--out=test.js']).then((output) => {
            done(expect(output.includes('Success')).toBeTruthy());
        });
    });
});
