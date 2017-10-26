import React,{Component} from 'react'
import '../App.css'
import {connect} from 'react-redux'
import {fetchAllPosts,fetchAllCategoryRelatedPost,deletePost} from '../actions/index'

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
				 		<h2>{post.title}</h2>
				 		<b>author:</b> {post.author}<br/>
				 		<span><b>content:</b> {post.body}</span><br/>
				 		<b>votes:</b> {post.voteScore} <span><b>category:</b> {post.category}</span>
				 	<hr/>	
				 	</div>
				 	<div className='rightColumn'>
				 		<input className='buttonColor centerAlign' type="button" value="Delete Post" onClick={()=>this.deletePost({postId:post.id})} />
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

const mapDispatchToProps = {fetchAllPosts,fetchAllCategoryRelatedPost,deletePost}

export default connect(mapStateToProps,mapDispatchToProps)(HomePageComponent)