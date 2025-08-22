import { IconArrowTopRight } from "../components/icon-arrow-top-right";
import { Link } from "../components/link";
import { ProjectDetail } from "../components/project-detail";

const Projects = () => {
    return (
        <>
            <div class="flex-column row-gap-xl">
                <ProjectDetail
                    name="evergreen"
                    siteUrl="https://evergreen.segment.com"
                    repoUrl="https://github.com/segmentio/evergreen"
                    description={
                        <p>
                            Evergreen is Segment's open-source React design
                            system with over 12,000 stars on Github. I quickly
                            became one of the
                            <Link
                                inline={true}
                                href="https://github.com/segmentio/evergreen/graphs/contributors"
                                externalIcon={<IconArrowTopRight />}>
                                most frequent contributors
                            </Link>
                            to the repository with bug fixes, package
                            maintenance and tests, and new features, including
                            an all-new
                            <Link
                                inline={true}
                                href="https://evergreen.segment.com/components/file-uploader"
                                externalIcon={<IconArrowTopRight />}>
                                File Uploader
                            </Link>
                            component. In addition to code contributions, I
                            acted as a resource to the community - responding to
                            questions, bug reports, and providing detailed
                            guidance on some of the more technical parts of the
                            system, such as theming.
                        </p>
                    }
                />
                <ProjectDetail
                    name="beets"
                    siteUrl="https://beets.studio"
                    repoUrl="https://github.com/brandongregoryscott/beets"
                    description={
                        <p>
                            Web-based DAW (Digital Audio Workstation) written in
                            React for making music. Utilizes a number of open
                            source libraries and products including:
                            <ul class="no-margin">
                                <li>
                                    <Link
                                        inline={true}
                                        href="https://github.com/segmentio/evergreen"
                                        externalIcon={<IconArrowTopRight />}>
                                        evergreen
                                    </Link>
                                    Design system by Segment
                                </li>
                                <li>
                                    <Link
                                        inline={true}
                                        href="https://jotai.org"
                                        externalIcon={<IconArrowTopRight />}>
                                        Jotai
                                    </Link>
                                    State management library for React
                                </li>
                                <li>
                                    <Link
                                        inline={true}
                                        href="https://supabase.com"
                                        externalIcon={<IconArrowTopRight />}>
                                        Supabase
                                    </Link>
                                    Open-source backend/cloud hosting
                                    alternative to Firebase
                                </li>
                            </ul>
                        </p>
                    }
                />
                <ProjectDetail
                    name="eslint-plugin-collation"
                    siteUrl="https://eslint-plugin-collation.brandonscott.me"
                    repoUrl="https://github.com/brandongregoryscott/eslint-plugin-collation"
                    description="ESLint plugin to enforce consistent, readable TypeScript code with automatic code fixes."
                />
                <ProjectDetail
                    name="kazoo"
                    siteUrl="https://kazoo.brandonscott.me"
                    repoUrl="https://github.com/brandongregoryscott/kazoo"
                    description={
                        <p>
                            VS Code extension to ease the process of maintaining
                            localized copy for an application. Uses{" "}
                            <Link
                                inline={true}
                                href="https://ts-morph.com"
                                externalIcon={<IconArrowTopRight />}>
                                ts-morph
                            </Link>
                            and
                            <Link
                                inline={true}
                                href="https://github.com/vitalets/google-translate-api"
                                externalIcon={<IconArrowTopRight />}>
                                @vitalets/google-translate-api
                            </Link>
                            to insert keys and translated values to a culture
                            file.
                        </p>
                    }
                />
                <ProjectDetail
                    name="and-cli"
                    repoUrl="https://github.com/rsm-hcd/AndcultureCode.Cli"
                    description={
                        <p>
                            Command line tool created to standardize daily
                            development and CI processes at{" "}
                            <Link
                                inline={true}
                                href="https://andculture.com"
                                externalIcon={<IconArrowTopRight />}>
                                andculture
                            </Link>
                            .
                        </p>
                    }
                />
            </div>
        </>
    );
};

const render = Projects;

export { render };
