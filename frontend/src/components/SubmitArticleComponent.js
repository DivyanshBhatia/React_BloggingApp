import React,{Component} from 'react'
import '../App.css'
import TextareaAutosize from 'react-autosize-textarea';
import {addNewPost} from '../actions/index'
import {connect} from 'react-redux'
const uuidv1 = require('uuid/v1')

class SubmitArticleComponent extends Component {

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

	render(){
		return (
			<div>
			<div className="padding15px">
				<label>
					Here you can Submit new Article/Edit existing Article
				</label>
			</div>
			<form onSubmit={this.handleSubmit}>
				<input type="text" name="author" onChange={this.handleChange} placeholder="Enter name of Author" className="textarea textfieldDimensions"/>
				<br/>
				<input type="text" name="title" onChange={this.handleChange} placeholder="Article Title" className="textarea textfieldDimensions"/>				
				<br/>	
				<TextareaAutosize name="content" rows={10} cols={50} onChange={this.handleChange} placeholder="Enter Content..." className="textarea" />
				<br/>
				
				{
					this.props.categories && Object.values(this.props.categories).length>0 &&
					<select name="category" onChange={this.handleChange} id = "categoriesId" className="categoriesDecorator">
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
		categories:state.categories
	}
}
const mapDispatchToProps = {addNewPost}
export default connect(mapStateToProps,mapDispatchToProps)(SubmitArticleComponent)