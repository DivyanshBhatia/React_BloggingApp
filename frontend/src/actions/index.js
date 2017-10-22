import {FETCH_ALL_POSTS,
  FETCH_ALL_CATEGORIES,
  FETCH_ALL_CATEGORY_POSTS} from './types'
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
  console.log(data);
  return {
    type: FETCH_ALL_CATEGORY_POSTS, 
    payload: data
  }
}


//This function is used to fetch all the posts
export function fetchAllPosts () {
  return (dispatch) => 
    api
      .get(`/posts`)
      .then(response => response.data)
      .then(data => dispatch(fetchPosts(data)), error => console.error(error))
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
export function fetchAllCategoryRelatedPost (category) {
  return (dispatch) => 
    api
      .get(`/${category}/posts`)
      .then(response => response.data)
      .then(data => dispatch(fetchCategoryRelatedPosts(data)), error => console.error(error))
}