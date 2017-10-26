import {ACTIVE_POST} from '../actions/types'

const DEFAULT_STATE={};

const ActivePostReducer = (state=DEFAULT_STATE, action)=>{
	const {type,payload}=action

	switch(type){
		case ACTIVE_POST:
		return payload

		default:
		return state
	}
}

export default ActivePostReducer