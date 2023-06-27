module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: [
          '.ios.ts',
          '.android.ts',
          '.ts',
          '.tsx',
          '.ios.tsx',
          '.android.tsx',
          '.tsx',
          '.jsx',
          '.js',
          '.jsx',
          '.json',
          '.png',
        ],
        alias: {
          // 원하는 별칭 설정 추가 (예: '@': './src')
          // '@utils': './utils',
          // '@components': './components',
          // '@screen': './screens',
          // '@assets': './assets',
        },
      },
    ],
  ],
};