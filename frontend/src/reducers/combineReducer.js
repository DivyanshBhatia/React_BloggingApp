import { combineReducers } from 'redux';
import PostsReducer from './PostsReducer';
import CategoriesReducer from './CategoriesReducer'
import ActivePostReducer from './ActivePostReducer'


const combineReducer = combineReducers({
	posts:PostsReducer,
	categories:CategoriesReducer,
	activePost:ActivePostReducer
});

export default combineReducer;