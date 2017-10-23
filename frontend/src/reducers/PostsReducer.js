import {FETCH_ALL_POSTS,FETCH_ALL_CATEGORY_POSTS,CREATE_NEW_POST} from '../actions/types'

const DEFAULT_STATE={};

const PostsReducer = (state=DEFAULT_STATE, action)=>{
	const {type,payload}=action
		
	switch(type){
		case FETCH_ALL_POSTS:
		return payload

		case FETCH_ALL_CATEGORY_POSTS:
		return payload

		case CREATE_NEW_POST:
		return payload
		

		default:
		return state
	}

}


export default PostsReducer