import React from 'react';
import {useSideBarState} from "../components/SidebarStateProvider";

const OneTwenty = () => {
    const {state} = useSideBarState();
    return (
        <div className={state.collapsed ? "home-open" : "home-close"}>
            <h2>1.20.1 Modding Tutorials</h2>
            <div>
                <p>Coming Soonisherino to a Youtube near you!</p>
            </div>
        </div>
    );
}
export default OneTwenty;