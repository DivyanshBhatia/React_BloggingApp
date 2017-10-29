import React,{Component} from 'react'
import {deletePostRelatedComment} from '../actions/index'
import {connect} from 'react-redux'
import '../App.css'

class CommentComponent extends Component{

deleteComment = comment => { 
	this.props.deletePostRelatedComment(comment)
	window.location.href=`/posts/${comment.parentId}/display`; 
}

editComment = comment => {
	window.location.href=`/posts/${comment.parentId}/edit/comment/${comment.commentId}`
}
	render(){
		const comment = this.props.comment
		
		return(
			<div>
				<div className='leftColumn'>
					{comment.body}<br/>
				 	<b>author:&nbsp;</b>{comment.author}
				 	
				 </div>
				 <div className='rightColumn'>
				 		<input className='buttonColor centerAlign' type="button" value="Delete Comment" 
				 		onClick={()=>this.deleteComment({commentId:comment.id,parentId:comment.parentId})} />
				 		<input className='buttonColor centerAlign' type="button" value="Edit comment" 
				 		onClick={()=>this.editComment({commentId:comment.id,parentId:comment.parentId})} />
				 <hr className="hrThick"/>
				 </div>

			</div>
	)}
}
function mapStateToProps(state){
	return{
	}
}
const mapDispatchToProps = {deletePostRelatedComment}

export default connect(mapStateToProps,mapDispatchToProps)(CommentComponent)