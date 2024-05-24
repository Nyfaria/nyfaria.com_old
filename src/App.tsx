import React from 'react';
import './App.css';
import data from "./data/solo_projects.json";
import {GoSidebarCollapse} from "react-icons/go";
import logo from './assets/image/icon.png';
import {BiSolidDownArrow, BiSolidLeftArrow, BiSolidRightArrow, BiSolidUpArrow} from "react-icons/bi";
import {IoSchoolSharp} from "react-icons/io5";
import {TbBrandMinecraft} from "react-icons/tb";
import {FaHome} from "react-icons/fa";

function App() {
    const [isCollapsed, setIsCollapsed] = React.useState(true);
    const [tutorialsCollapsed, setTutCollapsed] = React.useState(true);
    const [projectsCollapsed, setProjCollapsed] = React.useState(true);
    const onClick = () => setIsCollapsed(!isCollapsed)
    const onTutClick = () => setTutCollapsed(!tutorialsCollapsed)
    const onProjClick = () => setProjCollapsed(!projectsCollapsed)
    const icon = "./assets/image/icon.png"

    return (
        <div className="App">
            <div className={isCollapsed ? "sidebar-open" : "collapsed"}>
                <img className={"sidebar-logo"} src={logo} alt="logo"/>
                <div className={"sidebar-title"}>Modding with Nyfaria</div>
                <div className={"line-1"}></div>
                <div className={"sidebar-option"} id={"sidebar-tutorials"}><FaHome/>Home</div>
                <div className={tutorialsCollapsed ? "sidebar-option-close"  : "sidebar-option-open"} id={"sidebar-tutorials"} onClick={onTutClick}>
                    <IoSchoolSharp/>Tutorials {!tutorialsCollapsed ? <BiSolidDownArrow className={"float-right"}/> :
                    <BiSolidUpArrow className={"float-right"}/>}
                    <div className={!tutorialsCollapsed ? "sidebar-sub-option" : "collapsed"}
                         id={"sidebar-tutorials"}>1.12.2 Modding
                    </div>
                    <div className={!tutorialsCollapsed ? "sidebar-sub-option" : "collapsed"}
                         id={"sidebar-tutorials"}>Coming Soon...
                    </div>
                </div>

                <div className={projectsCollapsed ? "sidebar-option-close"  : "sidebar-option-open"} id={"sidebar-projects"} onClick={onProjClick}>
                    <TbBrandMinecraft/>Projects {!projectsCollapsed ? <BiSolidDownArrow className={"float-right"}/> :
                    <BiSolidUpArrow className={"float-right"}/>}
                </div>
            </div>
            <div onClick={onClick}
                 className={isCollapsed ? "sidebar-button-open" : "sidebar-button-close"}>{isCollapsed ?
                <BiSolidLeftArrow/> : <BiSolidRightArrow/>}</div>
        </div>
    );
}

export default App;