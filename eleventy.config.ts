import { jsxToString } from "jsx-async-runtime";

export default function (eleventyConfig: any) {
    eleventyConfig.setServerOptions({
        port: 3000,
    });

    // '<script src="https://gist.github.com/brandongregoryscott/6e05d88ba88dbe3d6a56d92a7b4f7067.js"></script>'

    eleventyConfig.addPreprocessor(
        "githubGistPreprocessor",
        "md",
        function (_data: unknown, content: string) {
            const lines = content.split("\n");
            const modifiedContent = lines
                .map((line) => {
                    const gistPattern =
                        /`gist:(?<gistId>[a-zA-Z0-9_\-]+\/[a-zA-Z0-9_\-]+)`/g;

                    const matches = gistPattern.exec(line);
                    const gistId = matches?.groups?.gistId;
                    if (matches !== null && gistId !== undefined) {
                        return line.replace(
                            gistPattern,
                            `<script src="https://gist.github.com/${gistId}.js"></script>`
                        );
                    }

                    return line;
                })
                .join("\n");

            return modifiedContent;
        }
    );

    eleventyConfig.addWatchTarget("src/**/*.css");

    eleventyConfig.addExtension(["11ty.jsx", "11ty.ts", "11ty.tsx"], {
        key: "11ty.js",
    });

    eleventyConfig.addTemplateFormats("11ty.ts,11ty.tsx");

    eleventyConfig.addPassthroughCopy({
        "src/css/*.css": "css",
        "src/media/*.{png,jpeg}": "media",
    });

    eleventyConfig.addTransform("tsx", async (content: any) => {
        const result = await jsxToString(content);
        return `<!doctype html>\n${result}`;
    });

    return {
        dir: {
            input: "src/site",
            /** This is relative to the `input` directory */
            layouts: "../_layouts",
            output: "_site",
        },
    };
}
