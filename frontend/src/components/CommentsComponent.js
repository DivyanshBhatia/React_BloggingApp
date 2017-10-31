import React,{Component} from 'react'
import '../App.css'
import CommentComponent from './CommentComponent'
import {connect} from 'react-redux'
import TextareaAutosize from 'react-autosize-textarea';
import {fetchAllPostRelatedComments,addNewPostComment} from '../actions/index'
import {withRouter } from 'react-router';
const uuidv1 = require('uuid/v1')

class CommentsComponent extends Component {

	constructor(props) {
        super(props);
        this.state = {
        id:uuidv1(),
		author:'',
		body:'',
		vote:0,
		formValidForSubmission:true
		}
    }

	componentWillMount() {
      this.props.fetchAllPostRelatedComments({postId:this.props.postId});
  	}

  	state = {
		id:uuidv1(),
		author:'',
		body:'',
		vote:0		
	}

	handleChange = event => {
		this.setState({
			[event.target.name]:event.target.value
		})
	}

	validateForm = () =>{
		if(this.state.body.length>0 
			&& this.state.author.length>0){	
		return true;
	} else {
			this.setState({
			formValidForSubmission:false
			})
		return false;
		}
	}

	handleSubmit = event => {
    event.preventDefault()
    if(this.validateForm()){
    const data = {
      id: this.state.id,
      timestamp: Date.now(),
      parentId: this.props.postId,
      body: this.state.body,
      author: this.state.author,
      voteScore: this.state.vote
    }
    	this.props.addNewPostComment(data) 
   		window.location.href=`/category/${this.props.match.params.category}/posts/${this.props.postId}/display`
   	}
	}

	render(){

		return(
			<div>
			{
				!this.state.formValidForSubmission && <div className="errMsg"><b>Author and Body are mandatory fields and cannot be empty. Please check what you have submitted and try again.</b></div>
			}
				 	{this.props.comments && Object.values(this.props.comments).length >0  && 
				 		Object.values(this.props.comments.payload).map(comment => 
                		<CommentComponent key={comment.id} category={this.props.match.params.category} comment={comment} isEditRequired={comment.id===this.props.match.params.commentId}/>           		
        			)}
				<form onSubmit={this.handleSubmit}>
					<TextareaAutosize name="body" rows={5} cols={20} onChange={this.handleChange} placeholder="Enter your comment here..." value={this.state.content} className="textarea" />
					<br/>
					<input type="text" name="author" onChange={this.handleChange} placeholder="Enter name of Author" value={this.state.author} className="textarea textfieldDimensions"/>
					<br/>
					<button type="submit" name="submitButton" id="submitButton">Add New Comment</button>
				</form>
			</div>)
	}

}

function mapStateToProps(state){
	return{
		comments:state.comments,
		activePost:state.activePost
	}
}

const mapDispatchToProps = {fetchAllPostRelatedComments,addNewPostComment}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(CommentsComponent))

