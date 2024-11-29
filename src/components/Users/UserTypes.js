import React from 'react';
import {  NavLink } from 'react-router-dom';
import "./userTypes.css";


function UserTypes({ paramId }) {

    return (
        <ul className = 'userTypes flex-container flex-column border'>
			<li className = 'link-wrapper'><NavLink to = {'/'+paramId+'/subscriptions'} className={({ isActive }) => isActive ? 'active-user-type' : 'link transition-style'}>subscriptions</NavLink></li>
			<li className = 'link-wrapper'><NavLink to = {'/'+paramId+'/subscribers'} className={({ isActive }) => isActive ? 'active-user-type' : 'link transition-style'}>subscribers</NavLink></li>
			<li className = 'link-wrapper'><NavLink to = {'/'+paramId+'/allUsers'} className={({ isActive }) => isActive ? 'active-user-type' : 'link transition-style'}>all users</NavLink></li>
		</ul>
    );
}

export default UserTypes;