import {FETCH_POST_COMMENTS} from '../actions/types'

const DEFAULT_STATE={};

const CommentsReducer = (state=DEFAULT_STATE, action)=>{
	
	const {type,payload}=action
	switch(type){
		case FETCH_POST_COMMENTS:
		return {...state,payload}

		default:
		return state
	}
}

export default CommentsReducer