import { combineReducers } from 'redux';
import PostsReducer from './PostsReducer';
import CategoriesReducer from './CategoriesReducer'
import ActivePostReducer from './ActivePostReducer'
import CommentsReducer from './CommentsReducer'


const combineReducer = combineReducers({
	posts:PostsReducer,
	categories:CategoriesReducer,
	activePost:ActivePostReducer,
	comments:CommentsReducer
});

export default combineReducer;