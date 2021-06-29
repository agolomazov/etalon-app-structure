const deepmerge = require('deepmerge');
const path = require('path');

const loadConfig = (filename) => {
  const configJson = require(filename);
  if (configJson.extends) {
    let baseConfigFilename;
    if (configJson.extends.startsWith('.')) {
      baseConfigFilename = path.join(
        path.dirname(filename),
        configJson.extends,
      );
    } else {
      baseConfigFilename = require.resolve(configJson.extends);
    }
    const baseConfig = loadConfig(baseConfigFilename);
    return deepmerge(baseConfig, configJson);
  } else {
    return configJson;
  }
};

module.exports = {
  loadConfig,
};
