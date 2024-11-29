import React from 'react';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { sendGetReq } from '../../../utils/common-functions';
import { useServerResponse } from '../../../utils/hooks';



function Like({ liked, likesCount, postId, isOwnerPage, isAuth }) {

console.log(liked)
    const [likesQuantity, setLikesQuantity] = useState(likesCount);
    const [isLiked, setLiked] = useState(liked);
    const processServerResponse = useServerResponse();

    console.log('isLiked '+isLiked)

    function likePost(newLikesQuantity) {
    	setLikesQuantity(newLikesQuantity);
        setLiked(!isLiked);
    }

    async function onClick(){
        const response = await sendGetReq(`/like/${postId}`);
        processServerResponse(response, likePost);
    }

    return (
        <button className ={isLiked ? 'btn post-btn clicked-btn border' : 'btn post-btn border transition-style'} onClick = {onClick}  disabled = {(!isAuth || isLiked || isOwnerPage) ? true : false} >
 			<FontAwesomeIcon icon={faHeart} />
 			<span> {likesQuantity}</span>
 		</button>
    );
}
export default Like;