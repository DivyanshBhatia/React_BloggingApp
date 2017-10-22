import {FETCH_ALL_POSTS} from '../actions/types'

const DEFAULT_STATE={};

const PostsReducer = (state=DEFAULT_STATE, action)=>{
	const {type,payload}=action
		
	switch(type){
		case FETCH_ALL_POSTS:
			console.log("hello",action.type,1)
		return payload

		default:
		return state
	}

}


export default PostsReducer