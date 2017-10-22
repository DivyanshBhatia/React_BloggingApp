import {FETCH_ALL_CATEGORIES} from '../actions/types'

const DEFAULT_STATE=null;

const CategoriesReducer = (state=DEFAULT_STATE, action)=>{
	const {type,payload}=action
		
	switch(type){
		case FETCH_ALL_CATEGORIES:
		return payload

		default:
		return state
	}

}


export default CategoriesReducer