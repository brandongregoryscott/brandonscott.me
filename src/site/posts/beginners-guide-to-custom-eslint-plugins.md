---
title: Beginner's Guide to Custom ESLint Plugins
date: 2022-07-25T00:00:00.000Z
description: ESLint has become the defacto standard in lint tooling for the JavaScript ecosystem in recent years. A number of big-name projects like React, Vue, Bootstrap and Node use it to ensure their codebases are stylistically consistent, patterns are followed, and bugs are prevented. Read on if you're looking to start writing custom rules for your own project or team.
tags: posts
---

![ESLint Exhaustive Deps Warning](/media/eslint-exhaustive-deps-warning.png)

ESLint has become the de facto standard in lint tooling for the JavaScript ecosystem in recent years, garnering over 20,000 stars on [GitHub](https://github.com/eslint/eslint) at the time of writing. A number of big-name projects like [React](https://github.com/facebook/react), [Vue](https://github.com/vuejs/core), [Bootstrap](https://github.com/twbs/bootstrap), and [Node](https://github.com/nodejs/node) use it to ensure their codebases are stylistically consistent, patterns are followed, and bugs are prevented.

If you've stumbled upon this article, you are likely already familiar with ESLint and might be looking to start writing custom rules for your own project or team. If not, I would recommend taking a look at [eslint.org](https://eslint.org/) for an overview before reading on. In short, it's a tool to help enforce consistent code style and reduce development errors when writing JavaScript (and TypeScript!) code.

In this article, I'll walk through the process of writing a custom ESLint plugin, starting with common terms, how to scaffold a new project, the anatomy of a rule, and testing. As an example, we'll implement a very simple rule that prevents variables from being prefixed with an underscore, such as `_foo`.

### Glossary

Before diving too deep into the implementation details, it's important to understand some of the terms that will be referenced throughout.

| Term                       | Description                                                                                                                                                                                                                                                                                                                                                                                                       |
| -------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Plugin                     | A package that extends the base functionality of ESLint. In most cases, it contains one or more custom rules, but it can also contain custom processors, which won't be covered in this article.                                                                                                                                                                                                                  |
| Rule                       | A module that analyzes source code and reports errors on the incorrect lines of code. ESLint ships with a set of core rules, and custom rules can be implemented in a plugin or defined at runtime.                                                                                                                                                                                                               |
| AST (Abstract Syntax Tree) | A tree representing the structure of your source code. The AST constructed by ESLint allows for more complex analysis than attempting to report errors based on regular expression patterns on the source code.                                                                                                                                                                                                   |
| Node                       | A model representing a specific instance of syntax from the source code. An example might be an `ImportDeclaration` (`import { isEmpty } from "lodash";`) or a `VariableDeclaration` (`const foo = 5;`).                                                                                                                                                                                                          |
| Parser                     | A module that constructs an AST from source code. In addition to the default parser ESLint ships with ([Espree](https://github.com/eslint/espree)), popular choices are [@babel/eslint-parser](https://www.npmjs.com/package/@babel/eslint-parser) which parses newer JavaScript syntax, and [@typescript-eslint/parser](https://www.npmjs.com/package/@typescript-eslint/parser) which parses TypeScript syntax. |
| Processor                  | A module that can extract JavaScript code from non-JavaScript files (such as `.md`) to be passed on for ESLint for handling. In most cases, you won't need to specify or write a custom processor.                                                                                                                                                                                                                |

### Getting Started

The simplest way to get started writing an ESLint plugin is to use the code generation tool [Yeoman](https://yeoman.io/) to scaffold out the basic project structure. The ESLint team has provided a [generator](https://github.com/eslint/generator-eslint) which can create a minimal plugin project and rules.

Run the following command to install Yeoman and the ESLint generator:

`npm install -g yo generator-eslint`

Once installed, make a new directory to hold the project and shell into it:

`mkdir ~/eslint-plugin-example && cd ~/eslint-plugin-example`

The Yeoman generator ships with two commands - one for generating the plugin, and one for generating rules for that plugin. First, you'll want to generate the plugin:

`yo eslint:plugin`

This command will open an interactive prompt for basic information about the plugin.

-   **Your name:** Used for authoring information in the `package.json` and source files.
-   **Plugin ID:** Unique name for your plugin, which should be all lowercase and separated by dashes.
-   **Contains custom ESLint rules:** Yes. You'll want your plugin to actually do something!
-   **Contains custom ESLint processors:** No. For most use-cases and the scope of this article, you won't need to write a custom processor.

Your final configuration should look something like this:

![yo eslint plugin configuration](/media/yo-eslint-plugin-configuration.png)

Once the plugin has been scaffolded out, we can run an additional generator for scaffolding out a rule, which will present another interactive prompt for basic information about the rule:

`yo eslint:rule`

-   **Your name:** Used for authoring information at the top of the rule source file.
-   **Publishing:** Unless you're contributing a new rule to the core [ESLint](https://github.com/eslint/eslint) repository, select the plugin option.
-   **Rule ID:** Unique name for your rule, which should be all lowercase and separated by dashes. If your rule is disallowing something, prefix the rule with `no-`.
-   **Example failing code:** A short snippet of code that will be used to scaffold out a unit test. This code should report an error when your rule is implemented.

![yo eslint rule configuration](/media/yo-eslint-rule-configuration.png)

### Project Structure

```
├── README.md                        # Plugin overview and documentation
├── docs
│   └── rules
│       └── no-underscore-var.md     # Documentation for the no-underscore-var rule
├── lib
│   ├── index.js                     # Index file to export all of the rules in ./rules
│   └── rules
│       └── no-underscore-var.js     # Implementation of the no-underscore-var rule
├── package-lock.json
├── package.json
└── tests
    └── lib
        └── rules
            └── no-underscore-var.js # Tests for the no-underscore-var rule
```

The project structure is fairly easy to follow and prescribes only the basics needed to keep rules, tests and documentation in a logical place. `docs/rules`, `lib/rules` and `tests/lib/rules` should all contain 1 file per rule, with the docs file ending in `.md`, not `.js`. Each file name should be lowercase and separated by dashes, just as the rule name was defined.

### Anatomy of a Rule

A rule is a module that exports a `create` function, which does the node visitation and error reporting work, and a `meta` object that provides additional information about what the rule does, how to find its documentation, and any configuration options that it should accept.

A new rule from the [Yeoman generator](https://github.com/eslint/generator-eslint) should have this structure:

<!-- prettier-ignore-start -->
```js
module.exports = {
  meta: {
    type: null, // `problem`, `suggestion`, or `layout`
    docs: {
      description:
        "Prevents variables from being named with an underscore prefix",
      recommended: false,
      url: null, // URL to the documentation page for this rule
    },
    fixable: null, // Or `code` or `whitespace`
    schema: [], // Add a schema if the rule has options
  },

  create(context) {
    // variables should be defined here

    //----------------------------------------------------------------------
    // Helpers
    //----------------------------------------------------------------------

    // any helper functions should go here or else delete this section

    //----------------------------------------------------------------------
    // Public
    //----------------------------------------------------------------------

    return {
      // visitor functions for different types of nodes
    };
  },
};
```


#### `meta`

As the name suggests, the `meta` object provides additional data about the rule that is used both internally by ESLint and by extensions in your code editor.

| Key              | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| type             | Indicates the general purpose of the rule and the type of errors it will report. Most rules will likely fall into the `suggestion` category, which indicates that the code can be written in a better way, but won't necessarily cause any issues if left untouched. The other types are `problem`, which is used to indicate an actual bug or lead to unintended behavior if left untouched, and `layout` which is for rules that are primarily concerned about formatting rather than the code itself. |
| docs.description | Short description of what the rule is used for, which should have been filled in by the generator.                                                                                                                                                                                                                                                                                                                                                                                                       |
| docs.recommended | Internally used by ESLint for denoting core rules that are included in the `recommended` config. This should be safe to omit for plugin-based rules.                                                                                                                                                                                                                                                                                                                                                     |
| docs.url         | Link to a documentation page for the rule. Usually this is a link to a doc site or a markdown file in the `docs` folder outlining what the rule does and examples of correct and incorrect code. The ESLint VS Code extension shows this link when hovering over an error reported by the rule.                                                                                                                                                                                                          |
| fixable          | Denotes the rule can be auto-fixed. If you implement a `fix` function when reporting an error, this needs to be set. (usually to `code`)                                                                                                                                                                                                                                                                                                                                                                 |
| schema           | [JSONSchema](https://json-schema.org/) formatted object defining configuration options the rule supports. For simple rules, you might not need to implement any configurable behavior. Additional documentation on the `schema` key can be found on the [ESLint Developer Guide](https://eslint.org/docs/latest/developer-guide/working-with-rules#options-schemas).                                                                                                                                     |

<!-- prettier-ignore-end -->

#### `create`

This function is where the logic for your rule will live. It will be run on each source file provided to ESLint _at least_ once (it might be automatically run on the same file multiple times if an auto-fix operation results in new errors reported).

The function should return an object of visitor functions that get called when the specified node is seen in a source file. From each visitor function, you can inspect the node, save some information about it, report errors or move on.

For example, a simple `create` implementation for the `no-underscore-var` rule might look like this:

<!-- prettier-ignore-start -->
```js
create(context) {
  // Utility function that accepts a VariableDeclaration node and
  // returns true if it contains any VariableDeclarators (node.declarations)
  // that have an Identifier (declarator.id) with a name
  // starting with an underscore
  const startsWithUnderscore = (node) =>
    node.declarations.some((declarator) =>
      declarator.id.name.startsWith("_"));
  return {
    // Visit any VariableDeclaration node and report an error
    // if we determine the node is in violation
    VariableDeclaration: (node) => {
      if (startsWithUnderscore(node)) {
        // report() is the main function from the context and
        // is used for specifying errors found in code
        context.report({
          node,
          message: "Variable names cannot begin with an underscore.",
        });
      }
    },
  };
}

```
<!-- prettier-ignore-end -->

In this example implementation, we are only visiting a single node (`VariableDeclaration`) and reporting an error on it if contains any `Identifier` nodes that start with an underscore. In more advanced cases, you might need to store a reference to nodes you visit and cross reference them in other visitor functions to determine whether the code is invalid.

#### AST Explorer

One of the most useful tools I've found while developing my own ESLint plugin is the [AST Explorer](https://astexplorer.net/). Until you're more familiar with the different nodes that are parsed from JavaScript or TypeScript syntax, you simply won't know what nodes you need to visit to implement your rule logic. It provides a text area for pasting in code and an interactive tree on the right for inspecting what types of nodes are represented by the code.

![astexplorer.net](/media/astexplorer.png)

### Unit Tests

Unit tests are a critical piece of ESLint rules, for both validating that your rule is functioning as intended but also to aid the development process. ESLint ships with a module aptly named `RuleTester` that provides a simple interface for writing tests for valid and invalid code examples. It wraps up all of the boilerplate involved for arranging, acting and asserting test cases - all you need to do is provide the code snippet and what error should be expected.

Tests can be run in your terminal with the standard `test` command:

`npm run test`

A simple set of tests for the `no-underscore-var` rule might look like this:

<!-- prettier-ignore-start -->
```js
const rule = require("../../../lib/rules/no-underscore-var");
const { RuleTester } = require("eslint");

const ruleTester = new RuleTester();
ruleTester.run("no-underscore-var", rule, {
  // Test cases that SHOULD NOT report any errors from the rule
  valid: [{ code: "var foo = 5;" }],
  // Test cases that SHOULD report errors from the rule
  invalid: [
    {
      code: "var _foo = 5;",
      errors: [
        {
          message: "Variable names cannot begin with an underscore.",
          type: "VariableDeclaration",
        },
      ],
    },
  ],
});
```
<!-- prettier-ignore-end -->

Test cases in the `valid` array should not specify an `errors` property, while it is required for test cases in the `invalid` array.

The `message` or `messageId` properties are used to ensure a specific error from your rule is reported, and the `type` property is also used to ensure the reported `node` is of the expected type. For example, if we had actually meant to report the error on the `VariableDeclarator` node instead of `VariableDeclaration`, the test would fail.

The object in the `errors` array can also specify additional pieces of data to validate, such as the `line`, `column`, `endLine` and `endColumn` or even the `suggestions` that are reported by the rule.

If your rule can fix the invalid code, you should specify what the corrected code should look like in the `output` property, i.e.

<!-- prettier-ignore-start -->
```js
{
  code: "var _foo = 5;",
  output: "var foo = 5;",
  errors: [
    {
      message: "Variable names cannot begin with an underscore.",
      type: "VariableDeclaration",
    },
  ],
};
```
<!-- prettier-ignore-end -->

### Manual Testing

Once you've written a few unit tests to cover common cases, you're ready to pull it into a project to make sure it runs properly on real world code. You'll often find that there are edge cases in larger codebases that you didn't account for in your unit tests and your rule might need some tweaking.

In order to add your plugin in another project, you'll have to package it up and publish it via [npm](https://docs.npmjs.com/creating-and-publishing-unscoped-public-packages). If you're not ready to publish your package to the public yet, you can use a tool like [yalc](https://github.com/wclr/yalc) which allows you to create a local package repository to publish and install packages from. I've found it much easier and more reliable to work with than the standard [npm link](https://docs.npmjs.com/cli/v8/commands/npm-link) method.

To install `yalc`, run the following command in your terminal:

`npm install -g yalc`

To publish your plugin to your local package repository, run the following command from your ESLint plugin directory:

`yalc publish`

To install your plugin in a project that you want to test it with, run the following command from that project directory:

`yalc add eslint-plugin-example`

It will update your `package.json` file with a link to the local package and create a `yalc.lock` file, which is similar to your `package-lock.json` or `yarn.lock` file.

Once you've installed the package, you need to specify it in your ESLint config and what rule(s) should be run. In your `.eslintrc` or whatever configuration file you have setup, you'll need to add the following:

```json
{
    // Replace with your plugin name
    // The eslint-plugin- prefix isn't required
    "plugins": ["example"],
    "rules": {
        // Specify the rule from your plugin and the level you want
        // issues to be reported at, i.e. warn or error
        "example/no-underscore-var": "warn"
    }
}
```

You're all set! You can run ESLint from the command line or restart the ESLint server in your code editor to pick up the new configuration, which should start linting with your rule.

To run ESLint from the command line, you can run the following command:

`npx eslint 'src/**/*.js'`

> Adjust to your file/directory structure. The quotes prevent automatic expansion by your shell.

If there are errors from the source code that was linted, you'll receive output with the rule, file, and line number of the error.

If ESLint encounters an error running your rule, you'll receive a message that looks like this with the rule that threw an exception and the underlying error message:

```sh
Oops! Something went wrong! :(

ESLint: 8.18.0

TypeError: Cannot read property 'startsWith' of undefined
Occurred while linting /Users/Brandon/beets/src/generated/hooks/domain/files/use-create-or-update-file.ts:19
Rule: "example/no-underscore-var"
```

It looks like my original implementation might have been making some assumptions about the structure of the `VariableDeclarator` node we were checking. Let's add a safe guard to check for `declarator.id.name` being non-null before accessing functions on it:

```diff
const startsWithUnderscore = (node) =>
  node.declarations.some((declarator) =>
-    declarator.id.name.startsWith("_")
+    declarator.id.name != null && declarator.id.name.startsWith("_")
  );
```

To test new changes for your package, you'll have to run through the same `yalc publish` and `yalc add` commands from earlier.

Now, running the rule on my codebase runs smoothly and returns errors for variables that have been named with an underscore!

```sh
/Users/Brandon/beets/src/utils/analytics-utils.ts
  74:1  error  Variable names cannot begin with an underscore  example/no-underscore-var
  95:1  error  Variable names cannot begin with an underscore  example/no-underscore-var
  98:1  error  Variable names cannot begin with an underscore  example/no-underscore-var

/Users/Brandon/beets/src/utils/hooks/use-project-state.ts
  41:5  error  Variable names cannot begin with an underscore  example/no-underscore-var

/Users/Brandon/beets/src/utils/hooks/use-track-section-steps-state.ts
  27:5  error  Variable names cannot begin with an underscore  example/no-underscore-var

/Users/Brandon/beets/src/utils/hooks/use-track-sections-state.ts
  34:5  error  Variable names cannot begin with an underscore  example/no-underscore-var

✖ 6 problems (6 errors, 0 warnings)
```

You can open up your favorite IDE with an ESLint extension to verify this behavior too.

![ESLint no-underscore-var error in VS Code](/media/eslint-no-underscore-var-error.png)

### Conclusion

Writing your own ESLint plugin and custom rules can be a powerful way to enforce a consistent style and prevent common errors in your team's codebase. With tools like the [ESLint Yeoman generator](https://github.com/eslint/generator-eslint) available to scaffold out a new project and rules, it's quick and easy to get started. The contrived rule implemented in this article is just scratching the surface of what you can build with ESLint, and I hope it serves as a good jumping off point for your own plugin!

#### Additional resources

-   View the source code for my own extension, [eslint-plugin-collation](https://github.com/brandongregoryscott/eslint-plugin-collation)
-   [Yeoman](https://yeoman.io/), a code generation tool
-   [generator-eslint](https://github.com/eslint/generator-eslint), the Yeoman generator for ESLint plugins and rules
-   [Yalc](https://github.com/wclr/yalc), a tool for testing out npm packages locally
-   [ESLint Developer Guide > Working with Rules](https://eslint.org/docs/latest/developer-guide/working-with-rules)
