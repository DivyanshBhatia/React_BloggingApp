import { combineReducers } from 'redux';
import PostsReducer from './PostsReducer';
import CategoriesReducer from './CategoriesReducer'
import ActivePostReducer from './ActivePostReducer'
import CommentsReducer from './CommentsReducer'
import SortReducer from './SortReducer'


const combineReducer = combineReducers({
	posts:PostsReducer,
	categories:CategoriesReducer,
	activePost:ActivePostReducer,
	comments:CommentsReducer,
	activeSort:SortReducer
});

export default combineReducer;