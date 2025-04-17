const fs = require("fs");
const path = require("path");
const glob = require("glob");
const { loadConfig } = require("./config");
const { parseFile } = require("./parser");
const { transformCode } = require("./transformer");

function clean(options = {}) {
  // Load and merge config
  const config = loadConfig(options.configPath);

  // Override config with CLI options
  const directory = options.directory || config.directory || ".";
  const ignorePatterns = options.ignorePatterns || config.ignorePatterns || [];
  const methods = config.methods || ["log", "debug", "info", "warn", "error"];
  const dryRun = options.dryRun || false;

  // Find files to process
  const files = glob.sync(`${directory}/**/*.{js,jsx,ts,tsx}`, {
    ignore: ["**/node_modules/**", ...ignorePatterns],
  });

  let totalRemoved = 0;

  // Process each file
  files.forEach((file) => {
    const code = fs.readFileSync(file, "utf-8");

    // Skip if no console statements
    if (!code.includes("console.")) {
      return;
    }

    try {
      const { transformedCode, removedCount } = transformCode(code, {
        methods,
        filepath: file,
      });

      if (removedCount > 0) {
        totalRemoved += removedCount;

        if (!dryRun) {
          fs.writeFileSync(file, transformedCode, "utf-8");
        }

        console.log(`${file}: removed ${removedCount} console statements`);
      }
    } catch (error) {
      console.error(`Error processing ${file}:`, error.message);
    }
  });

  return {
    processedFiles: files.length,
    removedStatements: totalRemoved,
  };
}

module.exports = { clean };
