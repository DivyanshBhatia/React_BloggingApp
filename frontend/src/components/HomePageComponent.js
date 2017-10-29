import React,{Component} from 'react'
import '../App.css'
import {connect} from 'react-redux'
import { Link } from 'react-router-dom'
import { dateTimeHelper } from '../utils/dateTimeHelper';
import {fetchAllPosts,fetchAllCategoryRelatedPost,deletePost,fetchActivePost} from '../actions/index'

class HomePageComponent extends Component {

componentDidMount(){ 
	this.fetchPosts();
}

componentDidUpdate (prevProps) {	
    if (prevProps.match.params.category !== this.props.match.params.category) {
      this.fetchPosts()
    }
  }

deletePost = postId => { 
	this.props.deletePost(postId)
	window.location.href = "/"; 
}

activePost = post => {	
	this.props.history.push(`/posts/${post.postId}/edit`)
}

fetchPosts = () =>{
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
				 	<div className='leftColumn'>
				 		<h2><Link className="Nav__link" to={`/posts/${post.id}/display`}>{post.title}</Link></h2>
				 		<b> Last Modified on:</b> {dateTimeHelper(post.timestamp)}<br/>
				 		<b>Author:</b> {post.author}<br/>
				 		<span><b>content:</b> {post.body}</span><br/>
				 		<b>votes:</b> {post.voteScore} <span><b>category:</b> {post.category}</span>
				 	<hr/>	
				 	</div>
				 	<div className='rightColumn'>
				 		<input className='buttonColor centerAlign' type="button" value="Delete Post" onClick={()=>this.deletePost({postId:post.id})} />
				 		<input className='buttonColor centerAlign' type="button" value="Edit Post" onClick={()=>this.activePost({postId:post.id})} />
				 	</div>
				 	
				 	</div>
				 	)
			}

			{
				!this.props.match.params.category && (!this.props.posts || Object.values(this.props.posts).length===0) && <div className='noPostMessage'>It seems you don't have any posts to display. Do hop on to the navigation bar to your left to add some posts.</div> 
			}
			{
				this.props.match.params.category && (!this.props.posts || Object.values(this.props.posts).length===0) && <div className='noPostMessage'>It seems you don't have any posts to display in <b>{this.props.match.params.category}</b> section. Do hop on to the navigation bar to your left to add some posts.</div> 
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

const mapDispatchToProps = {fetchAllPosts,fetchAllCategoryRelatedPost,deletePost,fetchActivePost}

export default connect(mapStateToProps,mapDispatchToProps)(HomePageComponent)