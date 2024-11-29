import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import { logOut } from '../redux/slices/userDataSlice';


export function useOwnerPageStatus(paramId) {

    const userId = useSelector((state) => state.userData.userId);
    if (!userId) return false;

    const isOwnerPage = paramId === userId ? true : false;
    return isOwnerPage;
}



export function useServerResponse() {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    function processServerResponse(response, handler) {
        if (response.isError) {
            return navigate('/error');
        } else if (response.isAuth === false) {
            dispatch(logOut());
            return navigate('/');
        }
        handler(response);
    }

    return processServerResponse;
}