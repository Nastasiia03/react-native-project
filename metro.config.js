const { getDefaultConfig } = require('expo/metro-config');

// Get the default configuration
const defaultConfig = getDefaultConfig(__dirname);

// Modify the asset extensions by pushing 'cjs'
defaultConfig.resolver.assetExts.push('cjs');

// Export the modified configuration
module.exports = defaultConfig;