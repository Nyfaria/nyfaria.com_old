import React from 'react';
import {useSideBarState} from "../components/SidebarStateProvider";

const OneTwelve = () => {
    const {state} = useSideBarState();
    return (
        <div className={state.collapsed ? "home-open" : "home-close"}>
            <h2>1.12.2 Modding Tutorials</h2>
            <div className={"home-desc"}>
                <p>Stop modding for ancient versions that are dying out contrary to unpopular opinions.</p>
                <p>Now go mod for 1.20+ and you'll get people to actually play your mods.</p>
            </div>
        </div>
    );
}
export default OneTwelve;