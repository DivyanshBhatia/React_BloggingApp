import React,{Component} from 'react'
import '../App.css'
import TextareaAutosize from 'react-autosize-textarea';
import {addNewPost} from '../actions/index'
import {connect} from 'react-redux'
import {fetchActivePost,editPost} from '../actions/index'
const uuidv1 = require('uuid/v1')

class SubmitArticleComponent extends Component {

	constructor(props) {
        super(props);
        this.state = {id:uuidv1(),
		author:'',
		title :'',
		category:'',
		content:''}
    }

	componentWillMount() {
    if (this.props.match.params.postId) {
      this.props.fetchActivePost(this.props.match.params.postId)
    } 
  }

	state = {
		id:uuidv1(),
		author:'',
		title :'',
		category:'',
		content:''		
	}

	handleChange = event => {
		this.setState({
			[event.target.name]:event.target.value
		})
	}

	handleSubmit = event => {
    event.preventDefault()
    const data = {
      id: this.state.id,
      timestamp: Date.now(),
      title: this.state.title,
      body: this.state.content,
      author: this.state.author,
      category: this.state.category,
      voteScore: 0,
      deleted: false
    }
    	this.props.addNewPost(data)
    	window.location.href = "/";  	
	
  }

  handleEdit = event => {
    event.preventDefault()
    const data = {
      id: this.props.match.params.postId,
      timestamp: Date.now(),
      title: this.state.title,
      body: this.state.content,
      author: this.state.author,
      category: this.state.category,
      voteScore: 0,
      deleted: false
    }
    	this.props.editPost(data)
    	window.location.href = "/";  	
	
  }

	render(){
		return (
			<div>
			<div className="padding15px">
				<label>
					Here you can Submit new Article/Edit existing Article
				</label>
			</div>
			<form onSubmit={this.props.match.params.postId ? this.handleEdit : this.handleSubmit}>
				<input type="text" name="author" onChange={this.handleChange} placeholder="Enter name of Author" value={(this.props.match.params.postId && this.props.activePost.author)?this.props.activePost.author:this.state.author} className="textarea textfieldDimensions"/>
				<br/>
				<input type="text" name="title" onChange={this.handleChange} placeholder="Article Title" value={(this.props.match.params.postId && this.props.activePost.title)?this.props.activePost.title:this.state.title} className="textarea textfieldDimensions"/>				
				<br/>	
				<TextareaAutosize name="content" rows={10} cols={50} onChange={this.handleChange} placeholder="Enter Content..." value={(this.props.match.params.postId && this.props.activePost.body)?this.props.activePost.body:this.state.content} className="textarea" />
				<br/>
				
				{
					this.props.categories && Object.values(this.props.categories).length>0 &&
					<select name="category" onChange={this.handleChange} value={(this.props.match.params.postId && this.props.activePost.category)?this.props.activePost.category:this.state.category} id = "categoriesId" className="categoriesDecorator">
						{this.props.categories &&
                        	  Object.values(this.props.categories)
                          	.map(category => <option value = {category.name} key={category.path}>{category.name}</option>)}
                    </select>
                }
				<br/>
				<button type="submit" name="submitButton" id="submitButton"> Submit Article</button>
			</form>
			</div>
			)
	}
}

function mapStateToProps(state){
	return{
		categories:state.categories,
		activePost:state.activePost
	}
}
const mapDispatchToProps = {addNewPost,fetchActivePost,editPost}
export default connect(mapStateToProps,mapDispatchToProps)(SubmitArticleComponent)