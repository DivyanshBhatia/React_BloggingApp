import React,{Component} from 'react'
import '../App.css'
import {connect} from 'react-redux'
import CommentsComponent from './CommentsComponent'
import { dateTimeHelper } from '../utils/dateTimeHelper'
import {fetchActivePost,editActivePostVote,deletePost} from '../actions/index'
import { Redirect } from 'react-router-dom'

const uuidv1 = require('uuid/v1')

class DisplayPostComponent extends Component {

	constructor(props) {
        super(props);
        this.state = {id:uuidv1(),
		author:'',
		title :'',
		category:'selectCategory',
		content:'',
		vote:0,
		timestamp:'',
		commentsCount:0,
		deleted: false
		}
    }

	componentWillMount() {
    	if (this.props.match.params.postId) {
      		this.props.fetchActivePost(this.props.match.params.postId).then(post => this.populatePost())
    	} 
  	}

  	editPost = voteString => { 
  		const data = {
      	id: this.state.id,
      	timestamp: Date.now(),
      	title: this.state.title,
      	body: this.state.content,
      	author: this.state.author,
      	category: this.state.category,
      	option: voteString.vote,
      	deleted: false
    }
		this.props.editActivePostVote(data).then(post => this.populatePost()) 
	}


  	populatePost(){
  	this.setState({
  		id:this.props.activePost.id,
  		author:this.props.activePost.author,
  		title:this.props.activePost.title,
  		category:this.props.activePost.category,
  		content:this.props.activePost.body,
  		vote:this.props.activePost.voteScore,
  		timestamp:this.props.activePost.timestamp,
		commentsCount:this.props.activePost.commentsCount,
  		deleted:this.props.activePost.deleted
  		})
  }

  	deletePost = postId => { 
		this.props.deletePost(postId)
		this.props.history.push("/"); 
	}

	activePost = post => {	
		this.props.history.push(`/posts/${post.postId}/edit`)
	}

	render(){
		return (
			<div>
			{(this.props.activePost !== undefined && this.state.deleted !== undefined && !this.state.deleted) ?
				<div className="displayPostClass">
					<div className='topHalf'>
						<div className='leftColumn'>
							<h2>{this.state.title}</h2>
							<b> Last Modified on:</b> {dateTimeHelper(this.state.timestamp)}<br/>
							<h4>author:&nbsp;{this.state.author}</h4>
							{this.state.content}<br/><br/>
							<b>category:&nbsp;</b>{this.state.category}<br/><br/>
							<b>Votes:</b><button onClick={()=>this.editPost({vote:"upVote"})} className="voteButton">+</button>{this.state.vote}<button className="voteButton" onClick={()=>this.editPost({vote:"downVote"})}>-</button>
							<b>Number of Comments:</b>&nbsp;&nbsp;{this.state.commentsCount} 
							<br/>
							<div>
								<hr/>
								<h2><i>Comments</i></h2>
							</div>
						</div>
				 		<div className='rightColumn'>
				 			<input className='buttonColor centerAlign' type="button" value="Delete Post" onClick={()=>this.deletePost({postId:this.props.activePost.id})} />
				 			<input className='buttonColor centerAlign' type="button" value="Edit Post" onClick={()=>this.activePost({postId:this.props.activePost.id})} />
				 		</div>					
					</div>
					<div className='bottomHalf'>
						<CommentsComponent postId={this.props.match.params.postId}/>
					</div>
			</div>
					 :
			<Redirect from="*" to="/pageNotFound" />
			}
		</div>
		

		)}
}


function mapStateToProps(state){
	return{
		activePost:state.activePost
	}
}

const mapDispatchToProps = {fetchActivePost,editActivePostVote,deletePost}
export default connect(mapStateToProps,mapDispatchToProps)(DisplayPostComponent)