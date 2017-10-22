import React,{Component} from 'react'
import '../App.css'
import { Link } from 'react-router-dom'


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
              			</ul>
              		</div>
				</div>

			)
	}
}

export default NavigationBar