import { Link } from "../components/link";
import { ProjectDetail } from "../components/project-detail";

const Projects = () => {
    return (
        <>
            <div class="flex-column row-gap-xl">
                <ProjectDetail
                    name="walledgarden"
                    siteUrl="https://walledgarden.club"
                    repoUrl="https://github.com/brandongregoryscott/walledgarden"
                    description={
                        <p>
                            A small virtual desktop web application with a media
                            player for my musical project,
                            <i>
                                <Link
                                    inline={true}
                                    href="https://walledgarden.bandcamp.com"
                                    external={true}
                                    openInNewTab={true}>
                                    walled garden
                                </Link>
                            </i>
                            . Built using
                            <Link
                                inline={true}
                                href="https://jdan.github.io/98.css"
                                external={true}
                                openInNewTab={true}>
                                98.css
                            </Link>
                            with some slight modifications and additions to get
                            close to the Windows 98 desktop look and feel.
                        </p>
                    }
                />
                <ProjectDetail
                    name="arthistory"
                    siteUrl="https://arthistory.brandonscott.me"
                    repoUrl="https://github.com/brandongregoryscott/arthistory"
                    description={
                        <p>
                            Simple web application for querying historical
                            artist data scraped from the Spotify API. The web
                            application is built with MongoDB's design system
                            <Link
                                inline={true}
                                href="https://www.mongodb.design"
                                external={true}
                                openInNewTab={true}>
                                LeafyGreen
                            </Link>
                            and
                            <Link
                                inline={true}
                                href="https://www.chartjs.org"
                                external={true}
                                openInNewTab={true}>
                                ChartJS
                            </Link>
                            for rendering the chart data.
                        </p>
                    }
                />
                <ProjectDetail
                    name="Evergreen"
                    siteUrl="https://evergreen.segment.com"
                    repoUrl="https://github.com/segmentio/evergreen"
                    description={
                        <>
                            <p>
                                Evergreen is
                                <Link
                                    inline={true}
                                    href="https://segment.com/"
                                    external={true}
                                    openInNewTab={true}>
                                    Segment
                                </Link>
                                's open-source React design system with over
                                12,000 stars on Github.
                            </p>
                            <p>
                                I quickly became one of the
                                <Link
                                    inline={true}
                                    href="https://github.com/segmentio/evergreen/graphs/contributors"
                                    external={true}
                                    openInNewTab={true}>
                                    most frequent contributors
                                </Link>
                                to the repository with bug fixes, package
                                maintenance and tests, and new features,
                                including an all-new
                                <Link
                                    inline={true}
                                    href="https://evergreen.segment.com/components/file-uploader"
                                    external={true}
                                    openInNewTab={true}>
                                    File Uploader
                                </Link>
                                component. In addition to code contributions, I
                                acted as a resource to the community -
                                responding to questions, bug reports, and
                                providing detailed guidance on some of the more
                                technical parts of the system, such as theming.
                            </p>
                        </>
                    }
                />
                <ProjectDetail
                    name="beets"
                    siteUrl="https://beets.studio"
                    repoUrl="https://github.com/brandongregoryscott/beets"
                    description={
                        <>
                            <p>
                                Web-based DAW (Digital Audio Workstation)
                                written in React for making music.
                            </p>
                            <p>
                                I built this application with a few primary
                                goals in mind. For one, I wanted to learn
                                <Link
                                    inline={true}
                                    href="https://github.com/segmentio/evergreen"
                                    external={true}
                                    openInNewTab={true}>
                                    Evergreen
                                </Link>
                                inside and out, since I had recently started at
                                <Link
                                    inline={true}
                                    href="https://segment.com/"
                                    external={true}
                                    openInNewTab={true}>
                                    Segment
                                </Link>
                                . I had also recently heard about
                                <Link
                                    inline={true}
                                    href="https://supabase.com"
                                    external={true}
                                    openInNewTab={true}>
                                    Supabase
                                </Link>
                                , which was marketed as an open-source
                                alternative to Firebase and recently opened up
                                for self-service access. Finally, I wanted to
                                take what I had learned at
                                <Link
                                    inline={true}
                                    href="https://andculture.com"
                                    external={true}
                                    openInNewTab={true}>
                                    andculture
                                </Link>
                                and apply it: standing up the frontend
                                architecture for a maintainable SaaS application
                                that could scale if needed, but for something
                                fun - making music. I never planned to monetize
                                the application, but Supabase made it really
                                easy to implement sign-up and login flows, and
                                it was nice to be able to persist data for each
                                user account (projects, samples, etc.)
                            </p>
                        </>
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
                            localized copy for an application. Uses
                            <Link
                                inline={true}
                                href="https://ts-morph.com"
                                external={true}
                                openInNewTab={true}>
                                ts-morph
                            </Link>
                            and
                            <Link
                                inline={true}
                                href="https://github.com/vitalets/google-translate-api"
                                external={true}
                                openInNewTab={true}>
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
                            development and CI processes at
                            <Link
                                inline={true}
                                href="https://andculture.com"
                                external={true}
                                openInNewTab={true}>
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
