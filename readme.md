# console-cleaner

A simple, configurable CLI tool to remove console statements from JavaScript and TypeScript code.

[![npm version](https://img.shields.io/npm/v/console-cleaner.svg)](https://www.npmjs.com/package/console-cleaner)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Overview

`console-cleaner` helps you clean up your code by removing console statements (`console.log`, `console.debug`, etc.) from JavaScript and TypeScript files. This is especially useful when preparing your code for production, where debug logs should be removed.

## Features

- 🧹 Removes console statements (`log`, `debug`, `info`, `warn`, `error`)
- 🔍 Configurable via CLI options or config file
- 📁 Works with both JavaScript and TypeScript
- 🚫 Supports ignore patterns for excluding files
- 🔄 Preserves code formatting and structure
- 🧪 Dry run option to preview changes

## Installation

### Global Installation

```bash
npm install -g console-cleaner
```

### Local Installation (recommended)

```bash
npm install --save-dev console-cleaner
```

## Usage

### Basic Usage

```bash
# If installed globally
console-cleaner

# If installed locally
npx console-cleaner
```

### With Options

```bash
# Specify directory to process
npx console-cleaner --dir src

# Ignore specific patterns
npx console-cleaner --ignore "test/**,**/*.spec.ts"

# Dry run (shows what would be removed without changing files)
npx console-cleaner --dry-run

# Use a custom config file
npx console-cleaner --config my-config.json
```

## Configuration

You can configure `console-cleaner` by creating a `.consolecleanerrc.json` file in your project root:

```json
{
  "methods": ["log", "debug", "info"],
  "ignorePatterns": ["test/**", "**/*.spec.{js,ts}", "**/*.test.{js,ts}"],
  "directory": "src"
}
```

### Available Configuration Options

| Option           | Description                        | Default                                     |
| ---------------- | ---------------------------------- | ------------------------------------------- |
| `methods`        | Array of console methods to remove | `["log", "debug", "info", "warn", "error"]` |
| `ignorePatterns` | Glob patterns to ignore            | `[]`                                        |
| `directory`      | Directory to process               | `"."` (current directory)                   |

## CLI Options

| Option                    | Description                                             |
| ------------------------- | ------------------------------------------------------- |
| `-c, --config <path>`     | Path to config file (default: `.consolecleanerrc.json`) |
| `-d, --dir <directory>`   | Directory to process (overrides config)                 |
| `-i, --ignore <patterns>` | Comma-separated patterns to ignore (overrides config)   |
| `--dry-run`               | Show what would be removed without changing files       |
| `-v, --version`           | Show version number                                     |
| `-h, --help`              | Show help                                               |

## Examples

### Remove only console.log and console.debug

```json
// .consolecleanerrc.json
{
  "methods": ["log", "debug"],
  "directory": "src"
}
```

### Ignore test files and preserve console.error

```json
// .consolecleanerrc.json
{
  "methods": ["log", "debug", "info", "warn"],
  "ignorePatterns": ["test/**", "**/*.spec.ts"]
}
```

### Integration with package.json scripts

```json
// package.json
{
  "scripts": {
    "build": "npm run clean-console && tsc",
    "clean-console": "console-cleaner --dir src"
  }
}
```

## Use Cases

- **Pre-production builds**: Remove debug logs before deploying
- **Bundle size optimization**: Reduce file size by removing console statements
- **Code cleanup**: Clean up development logs before committing code
- **Environment-specific builds**: Remove logging in production builds while keeping them in development

## How It Works

`console-cleaner` uses Babel to parse your JavaScript and TypeScript files, traverse the AST (Abstract Syntax Tree), and remove console statements based on your configuration. It preserves the original code structure and formatting as much as possible.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
