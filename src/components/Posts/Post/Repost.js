import React from 'react';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRetweet } from '@fortawesome/free-solid-svg-icons';
import { sendGetReq } from '../../../utils/common-functions';
import { useServerResponse } from '../../../utils/hooks';


function Repost({ reposted, repostsCount, postId, isOwnerPage, isAuth }) {

    const [repostsQuantity, setRepostQuantity] = useState(repostsCount);
    const [isReposted, setReposted] = useState(reposted);
    const processServerResponse = useServerResponse();


    function repostPost(newRepostsQuantity) {
    	setRepostQuantity(newRepostsQuantity);
        setReposted(!isReposted);
    }

    async function onClick(){ 
        const response = await sendGetReq(`/repost/${postId}`);
        processServerResponse(response, repostPost);
    }

    return (
        <button className = {isReposted ? 'btn post-btn clicked-btn border' : 'btn post-btn transition-style border'} onClick = {onClick} disabled = {(!isAuth || isReposted || isOwnerPage) ? true : false}>
	 		<FontAwesomeIcon icon={faRetweet} />
	 		<span>{repostsQuantity}</span>
	 	</button>
    );
}
export default Repost;