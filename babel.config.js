module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    ['module-resolver'],
    {
      root: ['.'],
      extensions: ['ios.ts', 'android.ts', '.ts', '.json', '.tsx', '.ios.tsx', '.android.tsx', '.jsx', '.js'],
    }
  ]
};
