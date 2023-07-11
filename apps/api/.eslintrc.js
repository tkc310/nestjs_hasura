module.exports = {
  root: true,
  env: {
    node: true,
    jest: true,
  },
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  plugins: ['@typescript-eslint'],
  parser: '@typescript-eslint/parser',
  ignorePatterns: ['dist/**', '.eslintrc.js'],
  parserOptions: {
    project: 'tsconfig.json',
    ecmaVersion: 'es2021',
    sourceType: 'module',
    tsconfigRootDir: __dirname,
  },
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
      },
      typescript: {},
    },
  },
  // @refs: https://gist.github.com/sin-tanaka/b18bf1b5b46bd685fee93bd26fb473b3
  rules: {
    // 関数の戻り値はtsの推論に任せる (exportする関数は必要)
    '@typescript-eslint/explicit-function-return-type': 'off',    
    // ts-ignoreを許可する
    '@typescript-eslint/ban-ts-comment': 'off',
    // type Props = {} などを許可する ()
    '@typescript-eslint/ban-types': [
      'off',
      {
        types: {
          '{}': false,
        },
      },
    ],

    /* nestjs用の設定 ここから */
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    /* nestjs用の設定 ここまで */

    // 厳密等価演算子を強制
    eqeqeq: 2,
    // FIXME: logだけ除外する
    'no-console': 'off',
  },
  overrides: [
    {
      files: ['*.ts', '*.d.ts'],
    },
  ],
};
