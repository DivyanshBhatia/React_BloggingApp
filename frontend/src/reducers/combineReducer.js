import { combineReducers } from 'redux';
import PostsReducer from './PostsReducer';


const combineReducer = combineReducers({
	posts:PostsReducer,
});

export default combineReducer;