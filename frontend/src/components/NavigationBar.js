import React,{Component} from 'react'
import '../App.css'
import { Link } from 'react-router-dom'
import {connect} from 'react-redux'


class NavigationBar extends Component {
  


  render(){
		return (
				<div className="Nav__container">
					<div className="Nav__right">
              			<ul className="Nav__item-wrapper">
              				<li className="Nav__item">
                  				<Link className="Nav__link" to="/">Home</Link>
                			</li>
                			<li className="Nav__item">
                  				<Link className="Nav__link" to="/submit">Submit New Article</Link>
                			</li>
                      <li className="Nav__item">
                      Categories
                      <ul>
                        {this.props.categories && Object.values(this.props.categories).length>0 &&
                          Object.values(this.props.categories)
                          .map(
                            category => 
                            <li key={category.path}>
                               <Link to= {`/category/${category.path}`}>
                                  {category.name}
                                </Link>
                            </li>
                            
                            )
                        }
                      </ul>
                      </li>
              			</ul>
              		</div>
				</div>

			)
	}
}

function mapStateToProps(state){
  return {
    categories:state.categories
  }
}

export default connect(mapStateToProps)(NavigationBar)