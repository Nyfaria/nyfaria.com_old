import React from 'react';
import logo from './logo.svg';
import './App.css';
import data from "./data/solo_projects.json";

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

function App() {
    const [projects, setProjects] = React.useState<FullData[]>([])
    React.useEffect(() => {
        Promise.all(projectList).then(
            (value: FullData[]) => {
                setProjects(value)
            }
        )
    }, [])


    return (
        <div className="App">
            <header className="App-header">
                Modding with Nyfaria
                <div>
                    <a className={"link"} target={"_blank"} href={"https://discord.gg/WbNYM68Bkt"}>
                        <img className={"social"} id={"discord"}
                             src={process.env.PUBLIC_URL + '/images/discord_icon.png'}></img>
                    </a>

                    <a className="link" target="_blank" href="https://twitter.com/TheNyfaria">
                        <img className="social" id="twitter"
                             src={process.env.PUBLIC_URL + "/images/twitter_icon.png"}></img>
                    </a>

                    <a className="link" target="_blank" href="https://github.com/Nyfaria">
                        <img className="social" id="github"
                             src={process.env.PUBLIC_URL + "/images/github_icon.png"}></img>
                    </a>
                </div>
                <div className={"line"}>
                </div>
            </header>
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
                            if(value.project.collaborators){
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

async function getModData(modid: string): Promise<CFData> {
    const response = await fetch(api + "/v1/mods/" + modid,
        {
            method: 'GET',
            headers: headers
        })
    const data = await response.json()
    return data as CFData;
}

export default App;

interface FullData {
    project: Project
    cfData: CFData
}

interface CFData {
    data: CFMod
}

interface Project {
    cfid: string;
    tag: string;
    name?: string;
    collaborators?: string;
    translation?: string;
    mdid?: string;
    version?: string;
}

interface CFMod {
    id: number
    gameId: number
    name: string
    slug: string
    links: ModLinks
    summary: string
    status: ModStatus
    downloadCount: number
    isFeatured: boolean
    primaryCategoryId: number
    categories: [Category]
    classId: number
    authors: [ModAuthor]
    logo: ModAsset
    screenshots: [ModAsset]
    mainFileId: number
    latestFiles: [File]
    latestFilesIndexes: [FileIndex]
    latestEarlyAccessFilesIndexes: [FileIndex]
    dateCreated: Date
    dateModified: Date
    dateReleased: Date
    allowModDistribution: boolean
    gamePopularityRank: number
    isAvailable: boolean
    thumbsUpCount: number
    rating: number
}

interface ModLinks {
    websiteUrl: string
    wikiUrl: string
    issuesUrl: string
    sourceUrl: string
}

enum ModStatus {
    New = 1,
    ChangesRequired = 2,
    UnderSoftReview = 3,
    Approved = 4,
    Rejected = 5,
    ChangesMade = 6,
    Inactive = 7,
    Abandoned = 8,
    Deleted = 9,
    UnderReview = 10
}

interface Category {
    id: number
    gameId: number
    name: string
    slug: string
    url: string
    iconUrl: string
    dateModified: Date
    isClass: boolean
    classId: number
    parentCategoryId: number
    displayIndex: number
}

interface ModAuthor {
    id: number
    name: string
    url: string
}

interface ModAsset {
    id: number
    modid: number
    title: string
    description: string
    thumbnailUrl: string
    url: string
}

interface File {
    id: number
    gameId: number
    modId: number
    isAvailable: boolean
    displayName: string
    fileName: string
    releaseType: FileReleaseType
    fileStatus: FileStatus
    hashes: [FileHash]
    fileDate: Date
    fileLength: number
    downloadCount: number
    fileSizeOnDisk: number
    downloadUrl: string
    gameVersion: [string]
    sortableGameVersion: [SortableGameVersion]
    dependcies: [FileDependency]
    exposeAsAlternative: boolean
    parentProjectFileId: number
    alternateFileId: number
    isServerPack: boolean
    serverPackFileId: number
    isEarlyAccessContent: boolean
    earlyAccessEndDate: Date
    fileFingerprint: number
    modules: [FileModule]
}

interface FileIndex {
}

enum FileReleaseType {
    Release = 1,
    Beta = 2,
    Alpha = 3
}

enum FileStatus {
    Processing = 1,
    ChangesRequired = 2,
    UnderReview = 3,
    Approved = 4,
    Rejected = 5,
    MalwareDetected = 6,
    Deleted = 7,
    Archived = 8,
    Testing = 9,
    Released = 10,
    ReadyForReview = 11,
    Deprecated = 12,
    Baking = 13,
    AwaitingPublishing = 14,
    FailedPublishing = 15
}

interface FileHash {
    hash: string
    algo: [HashAlgo]
}

enum HashAlgo {
    SHA1 = 1,
    MD5 = 2
}

interface SortableGameVersion {
    gameVersionName: string
    gameVersionPadded: string
    gameVersion: string
    gameVersionReleaseDate: Date
    gameVersionTypeId: number
}

interface FileDependency {
    modId: number
    relationType: FileRelationType
}

enum FileRelationType {
    EmbeddedLibrary = 1,
    OptionalDependency = 2,
    RequiredDependency = 3,
    Tool = 4,
    Incompatible = 5,
    Include = 6
}

interface FileModule {
    name: string
    fingerprint: number
}

type PartialProject = Partial<Project>;