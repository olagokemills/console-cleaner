const program = require("commander");
const { version } = require("../package.json");
const consoleCleaner = require("../src/index");
const chalk = require("chalk");

program
  .version(version)
  .option(
    "-c, --config <path>",
    "Path to config file",
    ".consolecleanerrc.json"
  )
  .option("-d, --dir <directory>", "Directory to process", ".")
  .option("-i, --ignore <patterns>", "Comma-separated patterns to ignore")
  .option("--dry-run", "Show what would be removed without changing files")
  .parse(process.argv);

const options = program.opts();

try {
  console.log(
    chalk.blue("🧹 Console Cleaner - Removing console statements...")
  );

  const result = consoleCleaner.clean({
    configPath: options.config,
    directory: options.dir,
    ignorePatterns: options.ignore ? options.ignore.split(",") : undefined,
    dryRun: options.dryRun || false,
  });

  console.log(
    chalk.green(
      `✅ Done! Processed ${result.processedFiles} files, removed ${result.removedStatements} console statements.`
    )
  );
} catch (error) {
  console.error(chalk.red("❌ Error:"), error.message);
  process.exit(1);
}
