const { stripTypeScriptTypes } = require("node:module");

module.exports = {
  process(source, filename) {
    return {
      code: stripTypeScriptTypes(source, { sourceUrl: filename }),
    };
  },
};
