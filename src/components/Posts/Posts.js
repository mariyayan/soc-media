import React from 'react';
import { useState } from 'react';
import NestedForm from "../common/Forms/NestedForm";
import Pagination from "../common/Pagination/Pagination";
import Post from "./Post/Post";
import "./posts.css";



function Posts({ postsData, isOwnerPage, isAuth }) {

    const [posts, setPosts] = useState(postsData);
    const [currentPosts, setCurrentPosts] = useState(posts.slice(0, 5));


    function setNewCurrentPosts(firstInd, lastInd) {
        let newCurrentPosts= posts.slice(firstInd, lastInd);
        setCurrentPosts(newCurrentPosts);
    }

    function addNewPost(newPost) {
        console.log(newPost)
        setPosts(posts => [newPost, ...posts]);
        setCurrentPosts(posts => [newPost, ...posts.slice(0, 4)]);
    }

    let postsElements = currentPosts.map(data => <Post key = {data.post._id} postInfo = {data} isOwnerPage ={isOwnerPage} isAuth = {isAuth} />);

console.log(posts.length, posts, currentPosts)

    return (
        <section className = 'posts margin-style'> 
			{isOwnerPage ? <NestedForm formType = 'addPostForm' handler = {addNewPost} /> : ''}
			<section>
				{postsElements}
			</section>
 			{posts.length > 5 ? <Pagination itemsQuantity = {posts.length} handler = {setNewCurrentPosts} /> : ''}
		</section>
    );
}
export default Posts;
