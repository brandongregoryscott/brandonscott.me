import chokidar from "chokidar";
import { exec } from "node:child_process";

/**
 * This script serves as a workaround to patch the 11ty dev server not properly reloading when
 * imported TS modules/TSX files that are not 11ty layout files are changed.
 *
 * The 11ty dev server still handles hot reloading for 11ty.tsx files, md files, and css files,
 * since it can properly hot reload those, and it faster then restarting the entire process.
 *
 * This server handles reloading TS/TSX files that wouldn't get picked up by the 11ty dev server only.
 *
 * @see https://github.com/11ty/eleventy/issues/3551
 */

const watcher = chokidar.watch("src");

/** @type {import('node:child_process').ChildProcess} */
let serveProcess;

console.log(`Watching 'src', running initial build...`);

watcher.on("change", (path) => {
    if (isNon11tyTsxOrTsFile(path)) {
        console.log(`change:${path}`);
        serve();
    }
});

serve();

/**
 * @param {string} path
 */
function isNon11tyTsxOrTsFile(path) {
    return (
        path.endsWith("ts") ||
        (path.endsWith("tsx") && !path.endsWith("11ty.tsx"))
    );
}

function serve() {
    if (serveProcess !== undefined) {
        serveProcess.kill();
    }

    serveProcess = exec("npm run serve");

    serveProcess.stdout.on("data", (stdout) => {
        console.log(stdout.toString().trim());
    });

    serveProcess.stderr.on("data", (stderr) => {
        console.error(stderr.toString().trim());
    });
}
