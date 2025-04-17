const parser = require("@babel/parser");

function parseFile(code, options = {}) {
  const parserOptions = {
    sourceType: "module",
    plugins: [
      "jsx",
      "typescript",
      "decorators-legacy",
      "classProperties",
      "objectRestSpread",
      "dynamicImport",
    ],
  };

  try {
    return parser.parse(code, parserOptions);
  } catch (error) {
    throw new Error(`Parse error: ${error.message}`);
  }
}

module.exports = { parseFile };
