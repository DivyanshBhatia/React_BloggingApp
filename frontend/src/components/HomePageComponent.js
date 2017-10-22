import React,{Component} from 'react'
import '../App.css'
import {connect} from 'react-redux'
import {fetchAllPosts,fetchAllCategoryRelatedPost} from '../actions/index'

class HomePageComponent extends Component {

componentWillMount(){
	this.fetchPosts();
}

fetchPosts = () =>{
	console.log("hello");
	if(this.props.match.params.category){
		this.props.fetchAllCategoryRelatedPost(this.props.match.params.category);
	} else {
		this.props.fetchAllPosts();
	}
}
	render(){
		return (
			<div>
			{
				this.props.posts &&
				 Object.values(this.props.posts).map(
				 	post => 
				 	<div className='post' key={post.id}>
				 		<h2>{post.title}</h2>
				 		<b>author:</b> {post.author}<br/>
				 		<span><b>content:</b> {post.body}</span><br/>
				 		<b>votes:</b> {post.voteScore} <span><b>category:</b> {post.category}</span>
				 		<hr/>
				 	</div>
				 	)
			}
			</div>
			)
	}
}

function mapStateToProps(state){
	return {
		posts:state.posts
	}
}

const mapDispatchToProps = {fetchAllPosts,fetchAllCategoryRelatedPost}

export default connect(mapStateToProps,mapDispatchToProps)(HomePageComponent)