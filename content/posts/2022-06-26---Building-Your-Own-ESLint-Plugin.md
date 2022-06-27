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

### Project Structure

### Unit Tests
