import React,{Component} from 'react'
import '../App.css'
import {connect} from 'react-redux'
import { Link } from 'react-router-dom'
import { dateTimeHelper } from '../utils/dateTimeHelper'
import {fetchAllPosts,fetchAllCategoryRelatedPost,deletePost,fetchActivePost,fetchAllPostRelatedComments,editActivePostVote} from '../actions/index'
import {
	BY_VOTE_HIGHEST,
	BY_VOTE_LOWEST,
	BY_MODIFIED_EARLIEST,
	BY_MODIFIED_LATEST
} from '../utils/sortConstantsHelper'

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
	this.props.history.push("/"); 
}

activePost = post => {	
	this.props.history.push(`/posts/${post.postId}/edit`)
}

editPostVote = (post,voteString) => { 
  		const data = {
      	id: post.id,
      	timestamp: Date.now(),
      	title: post.title,
      	body: post.body,
      	author: post.author,
      	category: post.category,
      	option: voteString.vote,
      	deleted: false
    }
		this.props.editActivePostVote(data).then(post => this.fetchPosts()) 
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
				 Object.values(this.props.posts).filter(post => (post.id!==undefined)).sort((post1,post2) => {
				 	switch(this.props.activeSort.sort){
				 		case BY_VOTE_HIGHEST:
				 		return post2.voteScore - post1.voteScore
				 		case BY_VOTE_LOWEST:
				 		return post1.voteScore - post2.voteScore
				 		case BY_MODIFIED_LATEST:
				 		return post2.timestamp - post1.timestamp
				 		case BY_MODIFIED_EARLIEST:
				 		return post1.timestamp - post2.timestamp
				 		default:
				 		return 0
				 	}
				 }).map(
				 	post => 
				 	<div className='post' key={post.id}>

				 	<div className='leftColumn'>
				 		<h2><Link className="Nav__link" to={`/category/${post.category}/posts/${post.id}/display`}>{post.title}</Link></h2>
				 		<b> Last Modified on:</b> {dateTimeHelper(post.timestamp)}<br/>
				 		<b>Author:</b> {post.author}<br/>
				 		<span><b>content:</b> {post.body}</span><br/>
				 		<b>Votes:</b><button onClick={()=>this.editPostVote(post,{vote:"upVote"})} className="voteButton">+</button>{post.voteScore}<button className="voteButton" onClick={()=>this.editPostVote(post,{vote:"downVote"})}>-</button>
						<span><b>category:</b> {post.category}</span>
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
		comments:state.comments,
		activeSort:state.activeSort,
		posts:state.posts
	}
}

const mapDispatchToProps = {fetchAllPosts,fetchAllCategoryRelatedPost,deletePost,fetchActivePost,editActivePostVote,fetchAllPostRelatedComments}

export default connect(mapStateToProps,mapDispatchToProps)(HomePageComponent)