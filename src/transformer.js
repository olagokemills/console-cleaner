const { parseFile } = require("./parser");
const traverse = require("@babel/traverse").default;
const generate = require("@babel/generator").default;

function transformCode(code, options = {}) {
  const { methods = ["log", "debug", "info", "warn", "error"], filepath } =
    options;

  // Parse the code
  const ast = parseFile(code, { filepath });

  let removedCount = 0;

  // Find and remove console statements
  traverse(ast, {
    MemberExpression(path) {
      if (
        path.node.object.type === "Identifier" &&
        path.node.object.name === "console" &&
        path.node.property.type === "Identifier" &&
        methods.includes(path.node.property.name)
      ) {
        // Find the parent statement (like console.log(...) or const x = console.log(...))
        const expressionStatement = path.findParent(
          (parent) =>
            parent.isExpressionStatement() ||
            (parent.isVariableDeclarator() && parent.get("init") === path)
        );

        if (expressionStatement) {
          expressionStatement.remove();
          removedCount++;
        }
      }
    },
  });

  // Generate code from the modified AST
  const transformedCode = generate(
    ast,
    {
      retainLines: true,
      comments: true,
    },
    code
  ).code;

  return { transformedCode, removedCount };
}

module.exports = { transformCode };
