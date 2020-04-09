module.exports = {
    preset: 'ts-jest',
    rootDir: 'src',
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
    },
    testEnvironment: 'jsdom',
    moduleFileExtensions: ['js', 'ts', 'tsx'],
    moduleDirectories: ['node_modules'],
    coverageReporters: ['html'],
    setupFilesAfterEnv: ['<rootDir>/setupTests.ts'],
    globals: {
        'ts-jest': {
            tsConfig: 'tsconfig.json',
        },
    },
};
