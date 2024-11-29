import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { useSelector } from 'react-redux';
import Header from "../Header/Header";
import Posts from "../Posts/Posts";
import Preloader from "../common/Preloader/Preloader";
import { sendGetReq } from "../../utils/common-functions";
import { useOwnerPageStatus, useServerResponse } from "../../utils/hooks";


function User() {

    const params = useParams();
    const paramId = params.id;
    const {isAuth, userId} = useSelector((state) => state.userData);
    const [userData, setUserData] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const isOwnerPage = useOwnerPageStatus(paramId);
    const processServerResponse = useServerResponse();

    useEffect(() => {
        const setStates = (data) => {
            setUserData(data);
            setIsLoaded(true);
        };

        const getData = async () => {
           let response = await sendGetReq(`/user/${paramId}`);
           processServerResponse(response, setStates);
        };

        getData();
    }, [paramId]);
  

    if (!isLoaded) {
        return (<Preloader />);
    } else {
        return (
            <section>
                <Header userData = {userData.user} userId = {userId} isOwnerPage = {isOwnerPage} isAuth = {isAuth} />
                <Posts postsData = {userData.posts} isOwnerPage = {isOwnerPage} isAuth = {isAuth} />
            </section>
        );
    }
}

export default User;