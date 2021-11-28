module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:fp-ts/recommended',
        'prettier',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 13,
        sourceType: 'module',
        tsconfigRootDir: __dirname,
        project: ['./tsconfig.json'],
    },
    plugins: ['@typescript-eslint', 'fp-ts'],
    rules: {
        'fp-ts/no-lib-imports': 'error',
        'fp-ts/no-module-imports': [
            'error',
            {
                allowTypes: true,
            },
        ],
    },
}
