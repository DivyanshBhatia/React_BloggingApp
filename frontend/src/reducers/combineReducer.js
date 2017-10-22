import { combineReducers } from 'redux';
import PostsReducer from './PostsReducer';
import CategoriesReducer from './CategoriesReducer'


const combineReducer = combineReducers({
	posts:PostsReducer,
	categories:CategoriesReducer
});

export default combineReducer;