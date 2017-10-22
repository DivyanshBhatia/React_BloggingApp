import {FETCH_ALL_POSTS} from './types'
import api from '../libs/apiCall'


function fetchPosts (data) {
	
  return {
  	type: FETCH_ALL_POSTS, 
  	payload: data
  }
}

export function fetchAllPosts () {
  return (dispatch) => 
    api
      .get(`/posts`)
      .then(response => response.data)
      .then(data => dispatch(fetchPosts(data)), error => console.error(error))
}