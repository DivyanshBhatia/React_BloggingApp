import React,{Component} from 'react'
import '../App.css'
import TextareaAutosize from 'react-autosize-textarea';

class SubmitArticleComponent extends Component {
	render(){
		return (
			<div>
			<div className="padding15px">
				<label>
					Here you can Submit new Article/Edit existing Article
				</label>
			</div>
				<input type="text" name="author" placeholder="Enter name of Author" className="textarea textfieldDimensions"/>
				<br/>
				<input type="text" name="title" placeholder="Article Title" className="textarea textfieldDimensions"/>				
				<br/>	
				<TextareaAutosize rows={10} cols={50} placeholder="Enter Content..." className="textarea" />
				<br/>
				<button type="submit" name="submitButton" id="submitButton"> Submit Article</button>

			</div>
			)
	}
}

export default SubmitArticleComponent