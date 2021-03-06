import React from "react";
import Sidebar from "../components/Sidebar";
import Layout from "../components/Layout";
import Page from "../components/Page";
import { Project } from "../components/Project/Project";
import { useSiteMetadata } from "../hooks";
import { useProjectsList } from "../hooks/use-projects-list";

const ProjectsPageTemplate = () => {
    const { title, subtitle } = useSiteMetadata();
    const projects = useProjectsList();

    return (
        <Layout title={`Projects - ${title}`} description={subtitle}>
            <Sidebar />
            <Page title="Projects">
                {projects.map((project) => (
                    <Project key={project.title} project={project} />
                ))}
            </Page>
        </Layout>
    );
};

export default ProjectsPageTemplate;
