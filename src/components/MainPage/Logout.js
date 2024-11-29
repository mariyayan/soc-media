import React from 'react';
import { NavLink } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { useServerResponse } from '../../utils/hooks';
import { sendGetReq } from "../../utils/common-functions";
import { logOut } from '../../redux/slices/userDataSlice';


function Logout() {
    
    const dispatch = useDispatch();
    const processServerResponse = useServerResponse();

    function handler() {
        dispatch(logOut());
    }

    async function onClick() {
       const response = await sendGetReq('/logout');
       processServerResponse(response, handler);
    }

    return (
        <NavLink to={"/"}  className = 'link logout-link transition-style' onClick = { onClick }>Log out</NavLink>   
    );
}
export default Logout;