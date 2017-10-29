import React,{Component} from 'react'
import '../App.css'
import {connect} from 'react-redux'
import {
	BY_VOTE_HIGHEST,
	BY_VOTE_LOWEST,
	BY_MODIFIED_EARLIEST,
	BY_MODIFIED_LATEST
} from '../utils/sortConstantsHelper'
import {sortPosts} from '../actions/index'

class SortComponent extends Component {

constructor(props) {
        super(props);
        this.state = {
        	currentSort:'selectSortBy'
		}
    }
componentWillMount() {
		if(this.props.activeSort){
			this.populateSortState();
		}
}

populateSortState(){
	this.setState({
		currentSort:this.props.activeSort.sort
	})
}

handleChange = event => {
	this.props.sortPosts(event.target.value);
}

render(){

		return (
			<div>
				<select name="sortBy" onChange={this.handleChange} 
					value={this.state.currentSort} id = "sortById" className="sortByDecorator">
						<option value = "selectSortBy" disabled>Sort By</option>
						<option value = {BY_VOTE_HIGHEST}>Sort By Votes Descending</option>
						<option value = {BY_VOTE_LOWEST}>Sort By Votes Ascending</option>
				 		<option value = {BY_MODIFIED_EARLIEST}>Sort By Earliest Modified time</option>
				 		<option value = {BY_MODIFIED_LATEST}>Sort By Latest Modified time</option>
				 </select>
		
			</div>
		)

	}

}
function mapStateToProps(state){
	return{
		activeSort:state.activeSort
	}
}
const mapDispatchToProps = {sortPosts}
export default connect(mapStateToProps,mapDispatchToProps)(SortComponent)