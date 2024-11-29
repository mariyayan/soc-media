import React from 'react';
import { Link } from 'react-router-dom';
import SubscriptionBtn from "./SubscriptionBtn";
import "./userCard.css";


function UserCard({ userData, isAuth, userId }) {

    return (
        <article className = 'userCard flex-container flex-column border'>
			      <div className = 'user-picture medium-user-picture'>
				        <img src={userData.imgSrc} />
			       </div>
			       <div className = 'user-card-data'>
				          <p className = 'user-link-container'><Link to = {`/user/${userData._id}`} className = 'link user-link transition-style'>{userData.name}</Link></p>
     			        <div className = 'links-container'>
  					           <Link to = {`/${userData._id}/subscriptions`} className = 'link transition-style'>{userData.subscriptionsQuantity} subscriptions</Link>
  					           <Link to = {`/${userData._id}/subscribers`} className = 'link transition-style'>{userData.subscribersQuantity} subscribers</Link>
  				        </div>
  			     </div>
  			     {isAuth && userData._id !== userId ? <SubscriptionBtn userId = {userData._id} isSubscribed = {userData.subscribed}/> : ''}
		      </article>
    );
}
export default UserCard;