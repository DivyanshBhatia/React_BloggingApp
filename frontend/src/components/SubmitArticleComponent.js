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
		category:'selectCategory',
		content:'',
		vote:0,
		formValidForSubmission:true
		}
    }

	componentWillMount() {
    if (this.props.match.params.postId) {
      this.props.fetchActivePost(this.props.match.params.postId).then(post => this.populatePost())
    } 
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

	state = {
		id:uuidv1(),
		author:'',
		title :'',
		category:'selectCategory',
		content:'',
		vote:0		
	}

	handleChange = event => {
		this.setState({
			[event.target.name]:event.target.value
		})
	}

	validateForm = () =>{
		if(this.state.title.length>0 && this.state.content.length>0 
			&& this.state.author.length>0 && this.state.category !== 'selectCategory'){	
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
      title: this.state.title,
      body: this.state.content,
      author: this.state.author,
      category: this.state.category,
      voteScore: this.state.vote,
      deleted: false
    }
    	this.props.addNewPost(data)
    	this.props.history.push("/");
    }
  }

  handleEdit = event => {
    event.preventDefault()

	if(this.validateForm()){
    const data = {
      id: this.props.match.params.postId,
      timestamp: Date.now(),
      title: this.state.title,
      body: this.state.content,
      author: this.state.author,
      category: this.state.category,
      voteScore: this.state.vote,
      deleted: false
    }

    	this.props.editPost(data)
    	this.props.history.push("/");
  	}
	}

	render(){
		return (
			<div>
			{
				!this.state.formValidForSubmission && <div className="errMsg"><b>Title, Author, Content and Category are mandatory fields and cannot be empty. Please check what you have submitted and try again.</b></div>
			}
			<div className="padding15px">
				<label>
					Here you can Submit new Article/Edit existing Article
				</label>
			</div>
			<form onSubmit={this.props.match.params.postId ? this.handleEdit : this.handleSubmit}>
				<input type="text" name="author" onInput={this.handleChange} onChange={this.handleChange}  placeholder="Enter name of Author" value={this.state.author} className="textarea textfieldDimensions"/>
				<br/>
				<input type="text" name="title" onInput={this.handleChange} onChange={this.handleChange} placeholder="Article Title" value={this.state.title} className="textarea textfieldDimensions"/>				
				<br/>	
				<TextareaAutosize name="content" rows={10} cols={50} onInput={this.handleChange} onChange={this.handleChange} placeholder="Enter Content..." value={this.state.content} className="textarea" />
				<br/>
				
				{
					this.props.categories && Object.values(this.props.categories).length>0 &&
					<select name="category" onInput={this.handleChange} onChange={this.handleChange} value={this.state.category} id = "categoriesId" className="categoriesDecorator">
						<option value = "selectCategory" disabled>Select Category</option>)}
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