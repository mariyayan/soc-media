import React from 'react';
import { useState, useEffect } from 'react';
import { NavLink, useParams } from "react-router-dom";
import { useSelector } from 'react-redux';
import Form from "../common/Forms/Form";
import Pagination from "../common/Pagination/Pagination";
import Preloader from "../common/Preloader/Preloader";
import UserCard from "./UserCard";
import UserTypes from "./UserTypes";
import { formsData } from '../../utils/forms-info';
import { sendGetReq } from "../../utils/common-functions";
import { useServerResponse } from "../../utils/hooks";
import "./users.css";



function Users({ usersType }) {

    const {isAuth,userId} = useSelector((state) => state.userData);
    const [users, setUsers] = useState(null);
    const [currentUsers, setCurrentUsers] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const processServerResponse = useServerResponse();
    const params = useParams();
    const paramId = params.id;

    useEffect(() => {

        const setStates = (data) => {
            setUsers(data);
            setCurrentUsers(data.slice(0, 5));
            setIsLoaded(true);
        }

        const getData = async () => {
            const response = await sendGetReq(`/getUsers/${paramId}/${usersType}`);
            processServerResponse(response, setStates);
        }

        getData();
    }, [paramId, usersType]);

    function setNewCurrentUsers(firstInd, lastInd){
        let newCurrentUsers = users.slice(firstInd, lastInd);
        setCurrentUsers(newCurrentUsers);
    }

    function onSubmit(data){
        let searchedValue = data.search;
        let searchedUser = users.filter(user => (new RegExp(searchedValue).test(user.name)));
        setCurrentUsers(searchedUser);
    }

    if (!isLoaded) {
        return (<Preloader />);
    } else {

        return (
            <section className = 'users-wrapper'>
                <div>
                    {isAuth ? <NavLink to={`/user/${userId}`} className = 'link profile-link transition-style'>Profile</NavLink> : ''}
                    <UserTypes paramId = {paramId} />
                </div>
                <Form formData = {formsData.searchForm} onSubmit = {onSubmit} />  
                <section className = 'users margin-style'>
                    {currentUsers.length ? currentUsers.map(user=> <UserCard key ={user._id} userData = {user} isAuth = {isAuth} userId = {userId} />) : <p>Search results not found</p>}
                </section>
                {users.length > 5 ? <Pagination itemsQuantity = {users.length} handler = {setNewCurrentUsers} /> : ''}
            </section>
        );
    }
}

export default Users;