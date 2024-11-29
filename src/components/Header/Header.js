import React from 'react';
import { NavLink } from "react-router-dom";
import Logout from "../MainPage/Logout";
import SubscriptionBtn from "../Users/SubscriptionBtn";
import UserHeaderInfo from "./UserHeaderInfo";
import "./header.css";

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// ТЕСТЫ
function Header({ userData, userId, isOwnerPage, isAuth }) {

    return (
        <header className = 'header flex-container flex-column bg-style margin-style'>
			<div className ='header-block'>
				<UserHeaderInfo data = {userData.name} contentType = 'text' formType = 'changeNameForm' isOwnerPage = {isOwnerPage} />
				<UserHeaderInfo data = {userData.imgSrc} contentType = 'img' formType = 'changePhotoForm' isOwnerPage = {isOwnerPage} />
				<div className ='header-links'>
					<NavLink to={`/${userData._id}/subscriptions`} className = 'link header-link transition-style'>{userData.subscriptionsQuantity} subscriptions</NavLink>
					<NavLink to={`/${userData._id}/subscribers`} className = 'link header-link transition-style'>{userData.subscribersQuantity} subscribers</NavLink>
				</div>
			</div>
			<div className ='header-block'>
				{isAuth ? <Logout /> : ''}
				<NavLink to={"/"} className = 'link header-link transition-style'>To main page</NavLink>
				{isAuth && !isOwnerPage ? <SubscriptionBtn userId = {userData._id} isSubscribed = {userData.isSubscribed} /> : ''}
				{!isAuth ? <div><NavLink to={"/authentication"} className = 'link header-link transition-style'>Authentication</NavLink> <NavLink to={"/registration"} className = 'link header-link transition-style'>Registration</NavLink> </div> : ''}
			</div>	
		</header>
    );
}

export default Header;