module.exports = {
    roots: ['./src'],
    collectCoverage: true,
    coveragePathIgnorePatterns: ['/node_modules/', '/src/logs.ts'],
    testMatch: ['**/__tests__/**/*.+(ts|tsx|js)', '**/?(*.)+(spec|test).+(ts|tsx|js)'],
    transform: {
        '^.+\\.(ts|tsx)$': 'ts-jest',
    },
};
