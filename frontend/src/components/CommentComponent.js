import React,{Component} from 'react'
import {deletePostRelatedComment} from '../actions/index'
import {connect} from 'react-redux'
import '../App.css'

class CommentComponent extends Component{

deleteComment = comment => { 
	this.props.deletePostRelatedComment(comment)
	window.location.href=`/posts/${comment.parentId}/display`; 
}
	render(){
		const comment = this.props.comment
		
		return(
			<div>
				<div className='leftColumn'>
					{comment.body}<br/>
				 	<b>author:&nbsp;</b>{comment.author}
				 	<hr className="hrThick"/>
				 </div>
				 <div className='rightColumn'>
				 		<input className='buttonColor centerAlign' type="button" value="Delete Comment" 
				 		onClick={()=>this.deleteComment({commentId:comment.id,parentId:comment.parentId})} />
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