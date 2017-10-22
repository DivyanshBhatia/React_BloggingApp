import React,{Component} from 'react'
import '../App.css'
import {connect} from 'react-redux'
import {fetchAllPosts} from '../actions/index'

class HomePageComponent extends Component {

componentWillMount(){
	this.props.fetchAllPosts();
	console.log("abc",this.props.posts)
}
	render(){
		return (
			<div>
			{
				this.props.posts &&
				 Object.values(this.props.posts).map(
				 	post => 
				 	<div className='post' key={post.id}>
				 		<h2>{post.title}</h2>
				 	</div>
				 	)
			}
			</div>
			)
	}
}

function mapStateToProps(state){
	return {
		posts:state.posts
	}
}

const mapDispatchToProps = {fetchAllPosts}

export default connect(mapStateToProps,mapDispatchToProps)(HomePageComponent)