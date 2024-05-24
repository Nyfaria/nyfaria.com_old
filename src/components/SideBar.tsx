import React from 'react';
import useState from 'react';
import {FaHome} from "react-icons/fa";
import {IoSchoolSharp} from "react-icons/io5";
import {BiSolidDownArrow, BiSolidLeftArrow, BiSolidRightArrow, BiSolidUpArrow} from "react-icons/bi";
import {TbBrandMinecraft} from "react-icons/tb";
import {useNavigate} from "react-router-dom";
import {useSideBarState, SideBarStateInterface} from "./SidebarStateProvider";


const SideBar = () => {
    const {setState} = useSideBarState();
    const {state} = useSideBarState();
    const [tutorialsCollapsed, setTutCollapsed] = React.useState(true);
    const [projectsCollapsed, setProjCollapsed] = React.useState(true);
    const doClick = (data: Partial<SideBarStateInterface>) => {
        setState((prev) => ({...prev, ...data}));
    }
    const onTutClick = () => setTutCollapsed(!tutorialsCollapsed)
    const onProjClick = () => setProjCollapsed(!projectsCollapsed)
    const icon = "./assets/image/icon.png"
    let navigate = useNavigate()
    let onHandleClick = () => doClick({collapsed: !state.collapsed})
    const goHome = () => navigate("./")
    const goOneTwelve = () => navigate("./1_12_2_modding_tutorials")
    const goOneTwenty = () => navigate("./1_20_1_modding_tutorials")
    const goSolo = () => navigate("./solo_projects")
    const goTeam = () => navigate("./team_projects")
    return (
        <div className="App">
            <div className={state.collapsed ? "sidebar-open" : "collapsed"}>
                <img className={"sidebar-logo"} src={process.env.PUBLIC_URL + "/images/icon.png"} alt="logo"/>
                <div className={"sidebar-title"}>Modding with Nyfaria</div>
                <div className={"line-1"}></div>
                <div className={"sidebar-option"} onClick={goHome}>
                    <FaHome/>Home
                </div>
                <div className={tutorialsCollapsed ? "sidebar-tutorials-close" : "sidebar-tutorials-open"}>
                    <div className={"sidebar-option"} onClick={onTutClick}>
                        <IoSchoolSharp/>Tutorials {!tutorialsCollapsed ? <BiSolidDownArrow className={"float-right"}/> :
                        <BiSolidUpArrow className={"float-right"}/>}
                    </div>
                    <div className={!tutorialsCollapsed ? "sidebar-sub-option sidebar-option-hover" : "collapsed"}
                         onClick={goOneTwelve}
                         id={"sidebar-tutorials"}>1.12.2 Modding
                    </div>
                    <div className={!tutorialsCollapsed ? "sidebar-sub-option" : "collapsed"}
                            onClick={goOneTwenty}
                         id={"sidebar-tutorials"}>1.20.1 Modding
                    </div>
                </div>

                <div className={projectsCollapsed ? "sidebar-projects-close" : "sidebar-projects-open"}>
                    <div className={"sidebar-option"} onClick={onProjClick}>
                        <TbBrandMinecraft/>Projects {!projectsCollapsed ?
                        <BiSolidDownArrow className={"float-right"}/> :
                        <BiSolidUpArrow className={"float-right"}/>}
                    </div>
                    <div className={!projectsCollapsed ? "sidebar-sub-option sidebar-option-hover" : "collapsed"}
                         onClick={goSolo}
                         id={"sidebar-tutorials"}>Solo/Collab Projects
                    </div>
                    <div className={!projectsCollapsed ? "sidebar-sub-option" : "collapsed"}
                         onClick={goTeam}
                         id={"sidebar-tutorials"}> Team Projects
                    </div>
                </div>
                <div className={"socials"}>
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
            </div>

            <div onClick={onHandleClick}
                 className={state.collapsed ? "sidebar-button-open" : "sidebar-button-close"}>{state.collapsed ?
                <BiSolidLeftArrow className={"vertical-center"}/> : <BiSolidRightArrow className={"vertical-center"}/>}
            </div>
        </div>
    );
}
export default SideBar;