import React,{Component} from 'react'
import '../App.css'

class CommentComponent extends Component{


	render(){
		const comment = this.props.comment
		
		return(
				<div>{comment.body}<br/>
				 	<b>author:&nbsp;</b>{comment.author}
				 	<hr className="hrThick"/>
				</div>
	)}
}

export default CommentComponent