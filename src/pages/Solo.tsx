import React from 'react';
import {CFData, FullData, Project} from "../data/CFInterfaces";
import data from "../data/solo_projects.json";
import {useSideBarState} from "../components/SidebarStateProvider";
import {FaExternalLinkAlt} from "react-icons/fa";

const api = "https://api.curseforge.com"
const apiM = "https://api.modrinth.com"
const headers = {
    'Accept': 'application/json',
    'x-api-key': '$2a$10$MWlyTNEQ03RlzpSSZhGg4.EY5Q6rIfFNpWmwM6ahkF3LmOphbOsDq'
};

const projectList: Promise<FullData>[] = data.projects.map(
    async (value: Project) => {
        const value2 = await getModData(value.cfid);
        return {project: value, cfData: value2};
    }
)

const Solo = () => {
    const {state} = useSideBarState();
    const [projects, setProjects] = React.useState<FullData[]>([])
    React.useEffect(() => {
        Promise.all(projectList).then(
            (value: FullData[]) => {
                setProjects(value)
            }
        )
    }, [])


    return (
        <div className={state.collapsed ? "home-open" : "home-close"}>
            <div className={"header"}>
                <h2> Solo/Collab Projects</h2>
            </div>
            <div className="project-list">
                {
                    projects.map(
                        (value: FullData) => {

                            var rx = /\b([0-9]|[0-9][0-9]|100)\b\.\b([0-9]|[0-9][0-9]|100)\b\.\b([0-9]|[0-9][0-9]|100)\b/gm
                            var rx2 = /(\bBETA|\bALPHA)/gm
                            let versions = value.cfData.data.latestFiles ? value.cfData.data.latestFiles[0].displayName.match(rx) : null
                            let alphabeta = value.cfData.data.latestFiles ? value.cfData.data.latestFiles[0].displayName.match(rx2) : null
                            let version;
                            if (value.project.version) {
                                version = value.project.version
                            } else {
                                if (versions) {
                                    version = versions[versions.length - 1]
                                } else {
                                    version = value.project.version
                                }
                                if (alphabeta) {
                                    version += (" " + (alphabeta[0].charAt(0).toUpperCase() + alphabeta[0].substr(1).toLowerCase()))
                                }
                            }
                            let authors = ""
                            if (value.project.collaborators) {
                                authors = value.project.collaborators
                            } else {
                                value.cfData.data.authors.forEach(element => {
                                    if (element.name == "Nyfaria") return;
                                    if (authors.length > 0) {
                                        authors += ", "
                                    }
                                    authors += element.name
                                });
                            }
                            return (
                                <div key={value.cfData.data.slug} className={"project-box"}>
                                    <div className={"project-name"}>
                                        {value.project.name ? value.project.name : value.cfData.data.name}
                                        <a target={"_blank"} href={value.cfData.data.links.websiteUrl}
                                           className={"no-decoration"}><FaExternalLinkAlt
                                            className={"float-right"}/></a>
                                    </div>
                                    {authors ? <div className="project-authors">With {authors}</div> : null}
                                    <div className={"line-2"}></div>
                                    <div className={"project-description"}>{value.cfData.data.summary}</div>
                                    {/*<div className={"project-cf-downloads"}>*/}
                                    {/*    <img alt="CurseForge Downloads"*/}
                                    {/*         src={"https://img.shields.io/curseforge/dt/" + value.cfData.data.id + "?style=for-the-badge&logo=curseforge&labelColor=%231c0c2e00&color=%231c0c2e00"}/>*/}
                                    {/*</div>*/}
                                    <div className={"project-footer"}>
                                        <div className={"line-3"}></div>
                                        <div className={"project-version"}>Version: {version}</div>
                                        <div className={"project-tag"}>{value.project.tag}</div>
                                    </div>
                                </div>
                            )
                        }
                    )
                }
            </div>
        </div>
    );
}


export default Solo;


async function getModData(modid: string): Promise<CFData> {
    const response = await fetch(api + "/v1/mods/" + modid,
        {
            method: 'GET',
            headers: headers
        })
    const data = await response.json()
    return data as CFData;
}