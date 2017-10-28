import React,{Component} from 'react'
import '../App.css'
import {connect} from 'react-redux'
import {fetchAllPostRelatedComments} from '../actions/index'
const uuidv1 = require('uuid/v1')

class CommentsComponent extends Component {

	constructor(props) {
        super(props);
        this.state = {
        id:'',
		author:'',
		body:'',
		vote:0
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

	render(){
		return(
			<div>
				{
					this.props.comments && Object.values(this.props.comments).length > 0 && Object.values(this.props.comments).map(
				 	comment => <div key={comment.id}>{comment.body}</div>)
			
				}
				{
					(!this.props.comments || Object.values(this.props.comments).length === 0) && <div> No Comments found for this post. Why don't you provide your thoughts here ?</div>
				}

			</div>)
	}

}

function mapStateToProps(state){
	return{
		comments:state.comments,
		activePost:state.activePost
	}
}

const mapDispatchToProps = {fetchAllPostRelatedComments}

export default connect(mapStateToProps,mapDispatchToProps)(CommentsComponent)

