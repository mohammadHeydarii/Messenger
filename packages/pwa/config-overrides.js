const baseOverride = require('../../base-config-overrides');

module.exports = function override(config, env) {
  config = baseOverride(config, env);
  config.resolve.extensions = [
    '.pwa.js',
    '.pwa.ts',
    '.pwa.tsx',
    '.web.js',
    '.web.ts',
    '.web.tsx',
    '.js',
    '.ts',
    '.tsx',
  ];
  return config;
};
