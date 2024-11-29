import React from 'react';
import { NavLink } from "react-router-dom";
import { useState } from 'react';
import { useSelector } from 'react-redux';
import Logout from "./Logout";
import "./maiPage.css";

function MainPage() {

 const userId = useSelector((state) => state.userData.userId);

    return (
        <section className = 'mainPage'>
            <div>
                <h1 className = 'mainPage-header'>Welcome</h1>
                <p className = 'mainPage-text'>Lorem ipsum</p>
           </div>
       
			{ userId ? <div className = 'mainPage-links'>
				<NavLink className = 'link transition-style' to={`/user/${userId}`}>To profile</NavLink> <Logout /></div> : <div className = 'mainPage-links'><NavLink className = 'link transition-style' to={"/registration"}>Registration</NavLink><NavLink className = 'link transition-style' to={"/authentication"}>Log in</NavLink></div>}
        </section>
    );
}

export default MainPage;