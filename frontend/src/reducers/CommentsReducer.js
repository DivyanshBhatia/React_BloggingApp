import {FETCH_POST_COMMENTS,DELETE_POST_COMMENT} from '../actions/types'

const DEFAULT_STATE={};

const CommentsReducer = (state=DEFAULT_STATE, action)=>{
	
	const {type,payload}=action
	switch(type){
		case FETCH_POST_COMMENTS:
		case DELETE_POST_COMMENT:
		return {...state,payload}

		default:
		return state
	}
}

export default CommentsReducer