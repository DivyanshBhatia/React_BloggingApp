import React,{Component} from 'react'
import {deletePostRelatedComment,editPostRelatedComment,editActivePostCommentVote} from '../actions/index'
import TextareaAutosize from 'react-autosize-textarea';
import { dateTimeHelper } from '../utils/dateTimeHelper';
import {connect} from 'react-redux'
import '../App.css'

class CommentComponent extends Component{

constructor(props) {
        super(props);
        this.state = {
        id:'',
		author:'',
		body:'',
		vote:0,
		formValidForSubmission:true
		}
    }

componentWillMount(){
		this.populatePost(this.props.comment);
}

populatePost=comment=>{
	//console.log(comment)
	this.setState({
  		id:comment.id,
  		author:comment.author,
  		body:comment.body,
  		vote:comment.voteScore
  		})
}


deleteComment = comment => { 
	this.props.deletePostRelatedComment(comment)
	window.location.href=`/category/${this.props.category}/posts/${comment.parentId}/display`; 
}

editComment = comment => {
	window.location.href=`/category/${this.props.category}/posts/${comment.parentId}/edit/comment/${comment.commentId}`
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

handleEdit = event => {
    event.preventDefault()
    if(this.validateForm()){
    const data = {
      id: this.state.id,
      timestamp: Date.now(),
      parentId: this.props.comment.parentId,
      body: this.state.body,
      author: this.state.author,
      voteScore: this.state.vote
    }
    	this.props.editPostRelatedComment(data)
   		window.location.href=`/category/${this.props.category}/posts/${data.parentId}/display`;
   	}
}

editCommentVote = voteOption => {
	const data = {
	  id: this.state.id,
      timestamp: Date.now(),
      parentId: this.props.comment.parentId,
      option:voteOption.vote
	}
	this.props.editActivePostCommentVote(data)
	window.location.href=`/category/${this.props.category}/posts/${data.parentId}/display`;
}

	render(){
		const {comment,isEditRequired} = this.props
		return(

			<div>
			
			{
			//Posts not requiring edit goes here
			!isEditRequired &&
			<div>
				<div className='leftColumn'>
				<hr className="hrThick"/>
					{comment.body}<br/>
				<b> Last Modified on:</b> {dateTimeHelper(comment.timestamp)}<br/>
				 	<b>author:&nbsp;</b>{comment.author}
				<b>&nbsp;&nbsp;Votes:</b>
				<button onClick={()=>this.editCommentVote({vote:"upVote"})} className="voteButton">+</button>
					{this.state.vote}
				<button className="voteButton" onClick={()=>this.editCommentVote({vote:"downVote"})}>-</button>
				<hr className="hrThick"/>
				 </div>
				 <div className='rightColumn'>
				 		<input className='buttonColor centerAlign' type="button" value="Delete Comment" 
				 		onClick={()=>this.deleteComment({commentId:comment.id,parentId:comment.parentId})} />
				 		<input className='buttonColor centerAlign' type="button" value="Edit comment" 
				 		onClick={()=>this.editComment({commentId:comment.id,parentId:comment.parentId})} />
				 
				 </div>
			</div>
			}

			
			{
			//Post that is being edited goes here
			isEditRequired &&
			<div>

				<div className='leftColumn'>
				<hr className="hrThick"/>
				{
				!this.state.formValidForSubmission && <div className="errMsg"><b>Author and Body are mandatory fields and cannot be empty. Please check what you have submitted and try again.</b></div>
				}
				<form onSubmit={this.handleEdit}>
					<TextareaAutosize name="body" rows={5} cols={20} onChange={this.handleChange} 
						placeholder="Enter your comment here..." value={this.state.body} className="textarea" />
					<br/>
					<input type="text" name="author" onChange={this.handleChange} 
						placeholder="Enter name of Author" value={this.state.author} className="textarea textfieldDimensions"/>
					<br/>
					<button type="submit" name="editButton" id="editButton">Confirm Edit</button>
					<hr className="hrThick"/>
				</form>
				</div>
				 <div className='rightColumn'>
				 		<input className='buttonColor centerAlign' type="button" value="Delete Comment" 
				 		onClick={()=>this.deleteComment({commentId:comment.id,parentId:comment.parentId})} />
				 		<input className='buttonColor centerAlign' type="button" value="Edit comment" 
				 		onClick={()=>this.editComment({commentId:comment.id,parentId:comment.parentId})} />
				 
				 </div>
			</div>
			}
			</div>
		
	)}
}
function mapStateToProps(state){
	return{
	}
}
const mapDispatchToProps = {deletePostRelatedComment,editPostRelatedComment,editActivePostCommentVote}

export default connect(mapStateToProps,mapDispatchToProps)(CommentComponent)