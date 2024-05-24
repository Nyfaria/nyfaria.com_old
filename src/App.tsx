import React from 'react';
import './App.css';
import SideBar from "./components/SideBar";
import {BrowserRouter, Route, Router, Routes} from "react-router-dom";
import Home from "./pages/Home";
import {SideBarStateProvider} from "./components/SidebarStateProvider";
import OneTwelve from "./pages/OneTwelve";
import Solo from "./pages/Solo";
import Group from "./pages/Group";
import OneTwenty from "./pages/OneTwenty";

function App() {
    return (
        <BrowserRouter>
            <SideBarStateProvider>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/1_12_2_modding_tutorials" element={<OneTwelve/>}/>
                    <Route path={"/solo_projects"} element={<Solo/>}/>
                    <Route path={"/team_projects"} element={<Group/>}/>
                    <Route path={"/1_20_1_modding_tutorials"} element={<OneTwenty/>}/>
                </Routes>
                <SideBar/>
            </SideBarStateProvider>
        </BrowserRouter>
    )
}

export default App;