import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const posts = defineCollection({
    loader: glob({ base: "./src/content/posts", pattern: "**/*.{md,mdx}" }),
    schema: z.object({
        date: z.coerce.date(),
        description: z.string(),
        title: z.string(),
    }),
});

const collections = { posts };

export { collections };
