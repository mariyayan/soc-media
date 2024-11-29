import React from 'react';
import { useState } from 'react';
import NestedForm from "../common/Forms/NestedForm";
import "./userHeaderInfo.css";


function UserHeaderInfo({ data, contentType, formType, isOwnerPage }) {

    const [userInfo, setUserInfo] = useState(data);

    return (
        <div className = 'user-header-info'>
			{contentType === 'img' ? <div className ='user-picture profile-user-picture'><img src={userInfo} /></div> : <div><p className = 'name'>{userInfo}</p></div>}
			{isOwnerPage ? <NestedForm formType = {formType} handler = {setUserInfo} /> : ''} 
		</div>
    );
}

export default UserHeaderInfo;