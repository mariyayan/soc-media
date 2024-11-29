import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRetweet } from '@fortawesome/free-solid-svg-icons';
import Like from "./Like";
import Repost from "./Repost";
import "./post.css";


function Post({ postInfo, isOwnerPage, isAuth }) {

    return (
        <article id = {postInfo.post._id} className = 'post border'>
 			<div className = 'user-data'>
 				<div className = 'flex-container'>
					<div className = 'post-user-picture user-picture medium-user-picture'>
 						<img src={postInfo.userImgSrc} />
 					</div>
 					<p className = 'post-user-name'>{postInfo.userName}</p>
 				</div>
 				<time className = 'time'>{postInfo.post.time}</time>
 			</div>

 			{postInfo.postReposted ? 
 				<div className = 'user-repost-data'>
 						<div className ='flex-container'>
 							<FontAwesomeIcon icon={faRetweet} />
 			    			<div className ='flex-container'>
								<div className = 'repost-user-picture user-picture small-user-picture'>
 									<img src={postInfo.post.authorImgSrc} />
 								</div>
 								<p>{postInfo.post.authorName}</p>
 							</div>
 						</div>
 						<time>{postInfo.post.repostTime}</time>
 			    </div> : ''}


 			<div>
				{postInfo.post.text ? <p className = 'text'>{postInfo.post.text}</p> : ''} 
				{postInfo.post.imgSrcs.length && <div className = 'post-pictures flex-container'> {postInfo.post.imgSrcs.map((imgSrc,ind) => <figure key = {imgSrc+ind}><div className = 'picture'><img src={imgSrc} /></div></figure>)} </div>} 
 			</div>
 			<div>
				<Like liked = {postInfo.liked} likesCount = {postInfo.likesCount} postId = {postInfo.post._id} isOwnerPage = {isOwnerPage} isAuth = {isAuth} />
				<Repost reposted = {postInfo.reposted} repostsCount = {postInfo.repostsCount} postId = {postInfo.post._id} isOwnerPage = {isOwnerPage} isAuth = {isAuth} />
			 </div>
		 </article>
    );
}

export default Post;