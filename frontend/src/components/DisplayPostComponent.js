import React,{Component} from 'react'
import '../App.css'
import {connect} from 'react-redux'
import {fetchActivePost,editActivePostVote} from '../actions/index'
const uuidv1 = require('uuid/v1')

class DisplayPostComponent extends Component {

	constructor(props) {
        super(props);
        this.state = {id:uuidv1(),
		author:'',
		title :'',
		category:'selectCategory',
		content:'',
		vote:0
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
  		vote:this.props.activePost.voteScore
  		})
  }

	render(){
		return (
			<div>
				<div className="displayPostClass">
					<h2>{this.state.title}</h2>
					<h4>author:&nbsp;{this.state.author}</h4>
					{this.state.content}<br/><br/>
					<b>category:&nbsp;</b>{this.state.category}<br/>
					<button onClick={()=>this.editPost({vote:"upVote"})} className="voteButton">+</button>{this.state.vote}<button className="voteButton" onClick={()=>this.editPost({vote:"downVote"})}>-</button>
				</div>			
			</div>
		)}
}


function mapStateToProps(state){
	return{
		activePost:state.activePost
	}
}

const mapDispatchToProps = {fetchActivePost,editActivePostVote}
export default connect(mapStateToProps,mapDispatchToProps)(DisplayPostComponent)