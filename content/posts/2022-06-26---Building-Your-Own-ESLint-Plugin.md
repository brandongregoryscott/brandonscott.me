---
template: post
title: Building Your Own ESLint Plugin
slug: Building Your Own ESLint Plugin
socialImage: /media/laptop-with-code-editor-2.jpg
draft: true
date: 2021-06-26T16:00:00.000Z
description: TODO
category: Engineering
tags:
    - productivity
    - tooling
    - linting
    - javascript
---

If you've stumbled upon this article, you are likely already familiar with ESLint and might be looking to start writing custom rules for your own project or team. If not, I would recommend taking a look at [eslint.org](https://eslint.org/) for an overview before reading on. In short, it's a tool to help enforce consistent code style and reduce development errors when writing JavaScript (and TypeScript!) code.

ESLint has become the defacto standard in lint tooling for the JavaScript ecosystem in recent years, garnering over 20,000 stars on [GitHub](https://github.com/eslint/eslint) at the time of writing. A number of big-name projects like [React](https://github.com/facebook/react), [Vue](https://github.com/vuejs/core), [Bootstrap](https://github.com/twbs/bootstrap), and [Node](https://github.com/nodejs/node) use it to ensure their codebases are stylistically consistent and patterns are followed.

### Glossary

Before diving too deep into the implementation details, it's important to understand some of the terms that will be referenced throughout.

| Term      | AKA                  | Description                                                                                                                                                                                                                                 |
| --------- | -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Plugin    |                      | A package that extends the base functionality of ESLint. In most cases, it contains one or more custom rules, but it can also contain custom processors.                                                                                    |
| Rule      |                      | A module that analyzes source code and reports errors on the incorrect lines of code. ESLint ships with a set of core rules, and custom rules can be implemented in a plugin or defined at runtime.                                         |
| AST       | Abstract Syntax Tree | A syntax tree representing the structure of your source code. The AST is constructed by ESLint allows for more complex code analysis than attempting to report errors based on regular expression patterns.                                 |
| Node      |                      | A model representing a specific instance of syntax from the source code. An example might be an `ImportDeclaration` or a `VariableDeclaration`.                                                                                             |
| Parser    |                      | A module that constructors an AST from source code. Common examples are [@babel/eslint-parser](https://www.npmjs.com/package/@babel/eslint-parser) and [@typescript-eslint/parser](https://www.npmjs.com/package/@typescript-eslint/parser) |
| Processor |                      | A module that can extract JavaScript code from non-JavaScript files (such as `.md`) to be passed on for ESLint for handling. In most cases, you won't need to specify or write a custom processor.                                          |

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

Once the plugin has been scaffolded out, we can run an additional generator for scaffolding out a rule:

`yo eslint:rule`

-   **Your name:** Used for authoring information at the top of the rule source file.
-   **Publishing:** Unless you're contributing a new rule to the core [ESLint](https://github.com/eslint/eslint) repository, select the plugin option.
-   **Rule ID:** Unique name for your rule, which should be all lowercase and separated by dashes. If your rule is disallowing something, prefix the rule with `no-`.
-   **Example failing code:** A short snippet of code that will be used to scaffold out a unit test.

![yo eslint rule configuration](/media/yo-eslint-rule-configuration.png)

### Project Structure

```
├── README.md
├── docs
│   └── rules
│       └── no-underscore-var.md
├── lib
│   ├── index.js
│   └── rules
│       └── no-underscore-var.js
├── package-lock.json
├── package.json
└── tests
    └── lib
        └── rules
            └── no-underscore-var.js
```

### Anatomy of a Rule

### Unit Tests
