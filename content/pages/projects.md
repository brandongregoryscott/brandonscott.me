---
template: page
title: Projects
showTitle: true
slug: projects
draft: false
---
## beets

[site](https://beets.studio) | [repo](https://github.com/brandongregoryscott/beets)

Web-based DAW (Digital Audio Workstation) written in React for making music. Utilizes a number of open source libraries and products including:

* [evergreen](https://github.com/segmentio/evergreen), a UI library by [Segment](https://segment.com)
* [ToneJS](https://github.com/Tonejs/Tone.js), a JS library for audio programming
* [reactronica](https://reactronica.com/), a React library that wraps ToneJS
* [Jotai](https://jotai.org/), a state management library for React
* [Supabase](https://supabase.com/), an open-source backend/cloud hosting alternative to Firebase

## collation

[site](https://brandongregoryscott.github.io/collation/) | [repo](https://github.com/brandongregoryscott/collation)

Command-line tool to make your TypeScript code easier to read. Uses [ts-morph](https://ts-morph.com/) to read and manipulate the TypeScript AST (Abstract Syntax Tree) to reorganize and enforce a consistent code style.

## kazoo

[site](https://brandongregoryscott.github.io/kazoo) | [repo](https://github.com/brandongregoryscott/kazoo)

VS Code extension to ease the process of maintaining localized copy for an application. Uses [ts-morph](https://ts-morph.com/) and [@vitalets/google-translate-api](https://github.com/vitalets/google-translate-api) to insert keys and translated values to a  culture file.

## and-cli

[repo](https://github.com/AndcultureCode/AndcultureCode.Cli)

Command line tool created to standardize daily development and CI processes at [andculture](https://andculture.com/).

* Cross-platform support using [shelljs](https://github.com/shelljs/shelljs) and [commander](https://github.com/tj/commander.js)
* Unit and integration test suites (see [Testing Strategy](https://github.com/AndcultureCode/AndcultureCode.Cli#testing-strategy))
* Plugin architecture for project-specific needs (see [Extending Functionality](https://github.com/AndcultureCode/AndcultureCode.Cli#extending-functionality) and the [example project](https://github.com/AndcultureCode/AndcultureCode.Cli.PluginExample))
* Support for [custom aliases](https://github.com/AndcultureCode/AndcultureCode.Cli#aliasing-commands) via package.json or in plugin projects