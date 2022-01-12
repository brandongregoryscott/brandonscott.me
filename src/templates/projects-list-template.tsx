import React from "react";
import { Link } from "gatsby";
import Sidebar from "../components/Sidebar";
import Layout from "../components/Layout";
import Page from "../components/Page";
import { useSiteMetadata } from "../hooks";
import { useProjectsList } from "../hooks/use-projects-list";

const ProjectsListTemplate = () => {
    const { title, subtitle } = useSiteMetadata();
    const projects = useProjectsList();

    return (
        <Layout title={`Projects - ${title}`} description={subtitle}>
            <Sidebar />
            <Page title="Projects">
                <ul>
                    {projects.map((project) => (
                        <li key={project.title}>
                            <a href={project.url}>{project.title}</a>
                        </li>
                    ))}
                </ul>
            </Page>
        </Layout>
    );
};

export default ProjectsListTemplate;
