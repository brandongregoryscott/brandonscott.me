---
title: Improving Developer Productivity by Building a CLI
date: 2020-10-20T16:00:00.000Z
tags: posts
description: Necessary repetitive interactions don't need to take as much time to type or brain space to remember
---

Necessary repetitive interactions don't need to take as much time to type or brain space to remember

![laptop with code editor](/media/laptop-with-code-editor.jpeg)

> Photo by [Christopher Gower](https://unsplash.com/@cgower) on [Unsplash](https://unsplash.com)

As an engineer, one of the most powerful tools you likely use in a day is your favorite command-line shell — this includes building, running, and testing projects, committing code, writing scripts, configuring environments, etc. These monotonous, repetitive interactions are necessary to our day-to-day work — but they don't need to take as much time to type or brain space to remember. Building a custom CLI that wraps common commands or even something more sophisticated like a build script can be a huge productivity booster for your team.

### What is a command-line interface (CLI)?

A CLI, or command-line interface, describes the process of interacting with a program via lines of text, usually sending commands and receiving informational output.

![Terminal window with output from CLI commands](/media/terminal.png)

> A screenshot of a terminal window running CLI commands

Nowadays, CLIs are often forgot about in favor of programs with GUIs, or graphical user interfaces. GUIs are a more visual way to interact with an application, usually built with buttons, sliders, dropdown menus, context menus, etc. What you may not know is that many applications with GUIs are also powered by a CLI, or at least offer a CLI with feature parity. Take Amazon Web Services for example — they offer a suite of web applications for spinning up cloud infrastructure in what they call the **_AWS Management Console._**

![Screenshot of the AWS Management Console landing page.](/media/aws-management-console.png)

> Screenshot of the AWS Management Console landing page. [Source](https://aws.amazon.com/about-aws/whats-new/2018/12/usability-improvements-for-aws-management-console/)

![Screenshot of the AWS Application Discovery service with a settings modal open](/media/aws-application-discovery-modal.png)

> Screenshot of the AWS Application Discovery service with a settings modal open. [Source](https://aws.amazon.com/blogs/aws/category/aws-management-console/)

While many users will prefer to configure their services this way, others will prefer a simpler interface, one that can also be used to automate their workflows (such as powering down and spinning up new environments.) Amazon offers a CLI to interact with their services as well, which is [well documented.](https://aws.amazon.com/cli/)

### Why should your development team invest in a CLI?

Many engineers, myself included, visit the command-line regularly while developing. The projects I'm working on often have a back-end and front-end element which require separate processes to run, and occasionally other dependencies (Redis, Docker, etc.)

Each of these have their own CLIs which can be hard to remember exact commands, arguments, and optional flags, and where you need to be in relation to your directory structure for them to work as expected.

For example, if I want to create a new [Entity Framework](https://github.com/dotnet/efcore) migration for my .NET Core project, I would need to be in the directory of the database layer of my solution, and pass the directory to the presentation layer of my solution to the command:

```
dotnet ef migrations add <migration name> --startup-project dotnet/api/Presentation/Web/Web.csproj
```

Not only is this verbose to remember, but it requires changing directories, too. When I'm developing a feature and I need to create a database migration, all I really want or need to care about should be the name of the migration after I've made the necessary code changes.

Using the [AndcultureCode.Cli](https://www.npmjs.com/package/and-cli) that we built using [ShellJS](https://www.npmjs.com/package/shelljs) and [Commander](https://www.npmjs.com/package/commander), the above command was reduced to:

```
and-cli migration -a <migration name>
```

The command does the grunt work of checking to see if you're in a valid .NET solution directory, finding the data project, and finding the presentation project. All you need to send it is a migration name.

While this may seem like a small gain at first glance, it takes the guesswork out of that process, and lets you get back to your primary work sooner. I'm willing to bet there are a number of situations like this that you encounter on a daily basis.

### How do you build a CLI?

For building command-line applications, most people tend to use [Bash](<https://en.wikipedia.org/wiki/Bash_(Unix_shell)>), which is a shell that can execute commands from user input, or execute a series of commands from a file (called a [shell script](https://en.wikipedia.org/wiki/Shell_script).) Bash is a natural first choice for many developers that work on Mac or Linux-based systems, since it is commonly the default shell when you open a new terminal instance.

Consider the following function which wraps the `dotnet restore` command and provides some additional output.

`gist:brandongregoryscott/134f20c521cc964aadd21fe5d7acd20b`

This doesn't seem too complicated, but it isn't taking any arguments for input. The only variable is `DOTNET_SOLUTION_FILE_PATH` which is defined manually in the same file. We could pull that out into another function that looks for a common .NET Core project structure under the current directory so it is a bit more dynamic.

`gist:brandongregoryscott/5be136b7b89ef42610b2d72144b60602`

Note: I don't use bash scripts for advanced tasks, so take this example with a grain of salt.

This new function, `findDotnetSolution`, is responsible for finding a dotnet solution file (in the form of `filename.sln`) under the current directory. It uses the [`ls`](http://man7.org/linux/man-pages/man1/ls.1.html) command to list the directory contents of the given path and checks the exit status of that command to determine whether or not matching files were found.

This solution removes some of the static configuration necessary for the script to work, but it's still pretty ugly because it's mostly duplicated code. Of course, Bash has a for loop concept like most other scripting and programming languages, so let's rewrite it to loop over the paths where we expect a dotnet solution to be found.

`gist:brandongregoryscott/22c8106629669bafd9a67a38527b5778`

This solution is better — it removes the duplicated code above, but it will still likely confuse developers who do not regularly write Bash scripts. For one, what does `$?` mean? Why does the first if block use `[` and `]`, whereas the second block uses `[[` and `]]`? Why can't we just return the actual path from `findDotnetSolution`?

### What is the difference between bash and other languages?

-   **Functions cannot return a value, only an exit code.** Think of each function as its own executable program: when you run and shutdown `dotnet`, it does not return anything, just a numeric code representing the execution as a success or failure (generally 0 is a successful run/shutdown, and non-zero represents a failure.)
    -   _There are some 'workarounds' for this behavior, but I personally find them undesirable and more confusing._
-   **There are multiple ways to write an 'if' block or test a condition.** `if`, the `test` command, `[[condition]]` and `[ condition ]` are all ways to 'test' a condition in Bash, but the [double brackets](https://tldp.org/LDP/abs/html/testconstructs.html#DBLBRACKETS) support logical operators such as `&&`, `||`, `<`, and `>` while the single brackets do not. Technically, brackets are not necessary when writing an `if` block. See the referenced documentation for further examples.
-   **Variables are referenced with a preceding `$`, whereas they are declared without one.** If you notice `DOTNET_SOLUTION_PATH` is declared early on without the `$`, but needs to be accessed with the `$` or the literal string "DOTNET_SOLUTION_PATH" will be used.
-   **Bash has some built-in "special" variables such as `$?` , which returns the exit value of last executed command.**
    -   _I'm sure there are other languages with special variables, and some could argue language constants and enumerations could be considered special variables._

There's more to cover, but these are some of the things I noticed when trying to remember how Bash worked to write examples for this post. It's worth noting that this makes sense, and isn't necessarily a bash on Bash: Bash is not a programming language, it is a command shell that can be used to write scripts. It can be useful for automating repetitive tasks you perform on the command line for creating files, changing directories, receiving and forwarding input from other programs or commands, etc. It shouldn't be used as a general purpose programming language.

---

The examples up to this point are included in the [phase1](https://github.com/brandongregoryscott/medium-example-cli/tree/master/phase1) directory of the [example repository](https://github.com/brandongregoryscott/medium-example-cli).

### So how ELSE could you write one?

[ShellJS](https://www.npmjs.com/package/shelljs) is a node package that provides a cross-platform implementation of common shell commands, such as `cd`, `ls`, `cat`, and more. It is unit tested and best of all: **_it's just JavaScript!_** It allows you to write modular, unit testable chunks of code in a language that you are likely already using in your project.

Take, for example, the command we created above that wraps `dotnet restore`.

`gist:brandongregoryscott/f72d6cbe2b7890f78ab47662ed01953f`

Note: There is another file not shown called 'main.js' (arbitrary) which acts as the entrypoint and calls restoreDotnetSolution().

This program is broken up in a very similar way to the Bash script:

-   It loops over an array of common file patterns where a dotnet solution file might be found.
-   It exits early if no solution file can be found.
-   The solution path is set as a variable and passed along to the dotnet restore command.

While at first glance this example looks longer and more complex, it does have some advantages over Bash. For one, you can easily write unit tests to prove this functionality works.

`gist:brandongregoryscott/0f3ebab254f7a46607943b68e61a0a64`

We are using [Jest](https://www.npmjs.com/package/jest) as our JS testing framework

Secondly, because this is just another module, you can import it elsewhere in your project to reuse the same code. Take this short example that restores the dotnet solution dependencies using the above code, and then builds the solution.

`gist:brandongregoryscott/4f473d3cb34ed8723ac50a6a191cf862`

Note that while this code works, it would probably make more logical sense to break out some of the common functions (`getFirstFile`, `getSolutionPath`, and `solutionPathOrExit`) into their own module, since they aren't directly tied to _just restoring_ or _just building_ the dotnet solution. By pulling them out into their own module, they are logically separated and can be tested independently.

---

The examples up to this point are included in the [phase2](https://github.com/brandongregoryscott/medium-example-cli/tree/master/phase2) directory of the [example repository](https://github.com/brandongregoryscott/medium-example-cli).

### Your custom CLI: building arguments, options, and documentation

If you've been following so far, perhaps you may have noticed that the current setup does not actually take any input from the user. As noted in a code sample above, there was a `main.js` file that called our function `restoreDotnetSolution`, but it didn't pass any arguments along. The function knew how to find the solution, restore it, and check for errors.

If you've used any command line interface before, you're likely accustomed to passing in certain argument or option flags to change the configuration on the command. For example, what if we wanted to pass an option to explicitly clean the build asset directories before restoring and building again? Something along these lines:

```
cli dotnet --clean --restore --build
```

Using the [Commander](https://www.npmjs.com/package/commander) package, we will write a main entrypoint for our CLI program, as well as a sub-command file for running dotnet-related actions.

`gist:brandongregoryscott/af92aa668c87804cfc722409ecd462f8`

Right now, we only have one sub-command which is `dotnet`. If you had other sub-commands for interacting with Jest, Webpack, etc., you'd register them here. The second argument to `command` is the description of the command, which should be short but useful to a new user navigating the interface of your program. Next, you'd create a file prefixed with entrypoint name, ending with your command name, i.e. `cli-dotnet.js`. All sub-commands of your CLI program will follow this pattern, and its consistent structure makes it easy to find, add or update commands.

This new sub-command file, `cli-dotnet.js`, will be responsible for parsing arguments from the user and deferring execution to what we declared as "modules" earlier. Generally speaking, it is cleaner and easier to test business logic for these CLI commands when their functions are broken out and the CLI file acts as the layer of "glue" to pull them together.

`gist:brandongregoryscott/d2fb166ff005ce5aaf349ca820fed121`

As you can see, this file follows a similar structure to the main entrypoint, `cli.js`. Arguments from the user are registered as "options" with a "flag" string and an optional description (though it is recommended.) You can specify short flags (such as `-b` ), verbose flags (such as `--build`), or both (`-b, --build`) as valid ways to "call" the commands. The presence of those options from the user will set a boolean flag on the `program` object itself, where you can conditionally call the modules you've written and imported.

There's some additional logic at the end of the file to check when "no arguments" are passed in (such as just typing `cli dotnet`), which will present the user with the help menu. (The user might not know to use the `-h` or `--help` flags to display the same information, which is a 'self-documenting' feature of Commander.)

`gist:brandongregoryscott/35e5b9e50ce7fa275346b60a4d30a4a5`

The examples up to this point are included in the [phase3](https://github.com/brandongregoryscott/medium-example-cli/tree/master/phase3) directory of the [example repository](https://github.com/brandongregoryscott/medium-example-cli).

---

With that piece covered, you should have everything you need to get started building out CLI tools for your own team. I've included a full repository with each "phase" of this blog post, as well as a link to the CLI that the engineering team at [andculture](https://andculture.com/) has built.

### Resources and more examples

-   View the source code for the [AndcultureCode.Cli](https://github.com/AndcultureCode/AndcultureCode.Cli) mentioned earlier
-   [Full repository](https://github.com/brandongregoryscott/medium-example-cli) containing the examples in this post
-   [ShellJS](https://www.npmjs.com/package/shelljs) on npm
-   [Commander](https://www.npmjs.com/package/commander) on npm
-   [Jest](https://www.npmjs.com/package/jest) on npm
