const fs = require("fs");
const path = require("path");

function loadConfig(configPath = ".consolecleanerrc.json") {
  const defaultConfig = {
    methods: ["log", "debug", "info", "warn", "error"],
    ignorePatterns: [],
    directory: ".",
  };

  try {
    if (fs.existsSync(configPath)) {
      const configContent = fs.readFileSync(configPath, "utf-8");
      const userConfig = JSON.parse(configContent);
      return { ...defaultConfig, ...userConfig };
    }
  } catch (error) {
    console.warn(
      `Warning: Could not load config from ${configPath}. Using default config.`
    );
  }

  return defaultConfig;
}

module.exports = { loadConfig };
