import React, {Component} from 'react'


class ListPlaces extends Component {
	state = {
        markers: [],
    }

    startSearch = (event) => {
		this.setState({query: event.target.value})
	}

	render () {
		let markers = this.props.markers
		console.log(markers)
		const {places, query, infobox} = this.state

		//if we have search, check if the query name is in our List of places
		if (query) {
            places.forEach((l,i) => {
                if(l.name.toLowerCase().includes(query.toLowerCase())) {
                    markers[i].setVisible(true)//google map specific
                } else {
                    if (infobox.marker === markers[i]){
                        infobox.close()
                    }
                    markers[i].setVisible(false)//google map specific
                }
            })
        }

		return (
 			<div className="sidebar">
                <input aria-label="Input filter places:" type='text' value={this.state.value} onChange={this.startSearch}/>
                <div>
                    <ul className="places_list" tabIndex="0" aria-label="List of favorites places">
                    	{
	                    	markers.filter(m => m.getVisible()).map((m, i) =>
	                        (<li role="link" className="location_item" key={i} data-placeid={m.index} tabIndex="0">{m.title}</li>))
	                    }
                    </ul>
                 </div>
            </div>
        )

	}
}

export default ListPlaces