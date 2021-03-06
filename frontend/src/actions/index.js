import {FETCH_ALL_POSTS,
  FETCH_ALL_CATEGORIES,
  FETCH_ALL_CATEGORY_POSTS,
  CREATE_NEW_POST,
  ACTIVE_POST,
  FETCH_POST_COMMENTS,
  DELETE_POST_COMMENT,
  ACTIVE_COMMENT_VOTE,
  SORT_POSTS
  } from './types'
import api from '../libs/apiCall'


function fetchPosts (data) {
  return {
  	type: FETCH_ALL_POSTS, 
  	payload: data
  }
}

function fetchCategories (data) {
  return {
    type: FETCH_ALL_CATEGORIES, 
    payload: data
  }
}

function fetchCategoryRelatedPosts (data) {
  return {
    type: FETCH_ALL_CATEGORY_POSTS, 
    payload: data
  }
}

function fetchPostComments(data){
  return {
    type: FETCH_POST_COMMENTS, 
    payload: data
  } 
}

function addPost(data){
  return {
    type: CREATE_NEW_POST, 
    payload: data
  }
}

function deletePostComment(data){
  return {
    type:DELETE_POST_COMMENT,
    payload:data
  }
}

function fetchActiveCommentVote(data){
  return {
    type:ACTIVE_COMMENT_VOTE,
    payload:data
  }
}

//This function is used to sort posts
export function sortPosts(data){
  return {
    type:SORT_POSTS,
    payload:{
      sort:data
    }
  }
}

//This function is used to fetch active post
export function publishActivePost(data){
  return {
    type: ACTIVE_POST, 
    payload: data
  }
}

//This function is used to fetch active post
export function fetchActivePost(postId){
  return (dispatch) => 
    api
      .get(`/posts/${postId}`)
      .then(post => api.get(`/posts/${post.data.id}/comments`)
      .then(response => (post.data.commentsCount = response.data.length))
      .then(() => post.data))
      .then(data => dispatch(publishActivePost(data)), error => console.error(error))
}

//This function is used to fetch all the posts
/*
Here making an additional api call to fetch comments related to posts
*/
export function fetchAllPosts () {
  
  return (dispatch) => 
    api
      .get(`/posts`)
      .then(response => Promise.all(Object.values(response.data).map(post => api.get(`/posts/${post.id}/comments`)
      .then(response => (post.commentsCount = response.data.length))
      .then(() => post)))).then(data => dispatch(fetchPosts(data)), error => console.error(error))
}

//This function is used to fetch all the categories
export function fetchAllCategories () {
  return (dispatch) => 
    api
      .get(`/categories`)
      .then(response => response.data.categories)
      .then(data => dispatch(fetchCategories(data)), error => console.error(error))
}

//This function is used to fetch all the categories
/*
Here making an additional api call to fetch comments related to category posts
*/
export function fetchAllCategoryRelatedPost (category) {
  return (dispatch) => 
    api
      .get(`/${category}/posts`)
      .then(response => Promise.all(Object.values(response.data).map(post => api.get(`/posts/${post.id}/comments`)
      .then(response => (post.commentsCount = response.data.length))
      .then(() => post))))
      .then(data => dispatch(fetchCategoryRelatedPosts(data)), error => console.error(error))
}

//This function is used to fetch all the categories
export function addNewPost (post){

  return (dispatch) => 
    api.post(`/posts`,post)
      .then(response => dispatch(addPost(response.data))
        , error => console.error(error))
}

//This function is used to delete post, and then fetch all posts
export function deletePost ({postId}){

  return (dispatch) => 
    api.delete(`/posts/${postId}`)
      .then(response => response.data)
      .then(data => dispatch(fetchAllPosts()), error => console.error(error)) 
}

//This function is used to edit post, and then fetch all posts
export function editPost (post){

  return (dispatch) => 
    api.put(`/posts/${post.id}`,post)
      .then(response => response.data)
      .then(data => dispatch(fetchAllPosts()), error => console.error(error)) 
}

//This function is used to edit post, and then fetch all posts
export function editActivePostVote (post){

  return (dispatch) => 
    api.post(`/posts/${post.id}`,{option:post.option})
      .then(response => response.data)
      .then(data => dispatch(fetchActivePost(data.id)), error => console.error(error)) 
}

//This function is used to fetch comments related to a post
export function fetchAllPostRelatedComments({postId}){
  return (dispatch) => 
    api.get(`/posts/${postId}/comments`)
    .then(response => response.data)
    .then(data => dispatch(fetchPostComments(data)), error => console.error(error))

}

//This function is used to add new comment
export function addNewPostComment(comment){
  return (dispatch) => 
    api.post(`/comments`,comment)
    .then(response => response.data)
  }

//This function is used to delete comment
export function deletePostRelatedComment({commentId}){
  return (dispatch) =>
  api.delete(`/comments/${commentId}`)
      .then(response => response.data)
      .then(data => dispatch(deletePostComment(data)), error => console.error(error)) 

}

//This function is used to delete comment
export function editPostRelatedComment(comment){
  return (dispatch) =>
  api.put(`/comments/${comment.id}`,comment)
      .then(response => response.data)
}

//This function is used to edit post, and then fetch all posts
export function editActivePostCommentVote (comment){
  return (dispatch) => 
    api.post(`/comments/${comment.id}`,{option:comment.option})
      .then(response => response.data)
      .then(data => dispatch(fetchActiveCommentVote(data)), error => console.error(error)) 
}