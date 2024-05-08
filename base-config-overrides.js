const path = require('path');
const webpack = require('webpack');

const resolvePath = (relativePath) => path.resolve(__dirname, relativePath);

const appIncludes = [
  resolvePath('./packages/components/src'),
  resolvePath('./packages/core/src'),
  resolvePath('./node_modules/react-native-select-dropdown'),
  resolvePath('./node_modules/react-native-gesture-handler'),
  resolvePath('./node_modules/@gorhom/bottom-sheet'),
  resolvePath('./node_modules/@react-navigation/stack'),
  resolvePath('./node_modules/@react-navigation/drawer'),
  resolvePath('./node_modules/react-native-vector-icons'),
  resolvePath('./node_modules/react-native-push-notification'),
  resolvePath('./node_modules/react-native-gifted-chat'),
  resolvePath('./node_modules/react-native-lightbox-v2'),
  resolvePath('./node_modules/react-native-parsed-text'),
  resolvePath('./node_modules/expo-av'),
  resolvePath('./node_modules/expo-asset'),
  resolvePath('./node_modules/expo-modules-core'),
  resolvePath('./node_modules/crypto'),
];

function updateOneOf(oneOfArray) {
  for (const rule of oneOfArray) {
    if (rule.test && /jsx|tsx/.test(rule.test.toString())) {
      rule.include = appIncludes;
      if (rule.options && rule.options.plugins) {
        rule.options.plugins = [
          require.resolve('babel-plugin-react-native-web'),
        ].concat(rule.options.plugins);
      }
      rule.options.presets.push('@babel/preset-react');
      return true;
    }
  }
  return false;
}

module.exports = function override(config, env) {
  // Remove ModuleScopePlugin to allow imports from outside src directory
  config.resolve.plugins = config.resolve.plugins.filter(
    (plugin) => plugin.constructor.name !== 'ModuleScopePlugin',
  );

  if (config.module.rules) {
    for (const rule of config.module.rules) {
      if (rule.oneOf && updateOneOf(rule.oneOf)) {
        break;
      }
    }
  }

  const isStage = process.argv.indexOf('--stage') !== -1;
  const isRC = process.argv.indexOf('--rc') !== -1;

  config.plugins.push(
    new webpack.DefinePlugin({ __DEV__: env !== 'production' }),
    new webpack.DefinePlugin({ __STAGE__: isStage }),
    new webpack.DefinePlugin({ __RC__: isRC }),
  );

  return config;
};
