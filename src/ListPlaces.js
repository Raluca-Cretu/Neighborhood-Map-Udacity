import React, {Component} from 'react'


class ListPlaces extends Component {
	
	componentDidMounr() {
		
	}

    startSearch = (event) => {
		this.setState({query: event.target.value})
	}

	render () {
		let markers = this.props.markersFromParent
		const {places, query, infobox} = this.state

		return (
            <ul className="places_list" tabIndex="0" aria-label="List of favorites places">
            	{
                	this.props.markersFromParent.filter(m => m.getVisible()).map((m, i) =>
                    (<li role="link" className="location_item" key={i} data-placeid={m.index} tabIndex="0">{m.title}</li>))
                }
            </ul>
        )
	}
}

export default ListPlaces