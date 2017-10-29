import {SORT_POSTS} from '../actions/types'

const DEFAULT_STATE={};

const SortReducer = (state=DEFAULT_STATE, action)=>{
	
	const {type,payload}=action
	switch(type){
		case SORT_POSTS:
		return payload

		default:
		return state
	}
}

export default SortReducer