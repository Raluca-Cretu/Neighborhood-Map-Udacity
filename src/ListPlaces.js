import React, {Component} from 'react'



class ListPlaces extends Component {
	state = {
        markers: [],
    }


	render () {
		const {markers} = this.state

		return (
 			<div className="sidebar">
                <input role="search" type='text' value={this.state.value} onChange={this.startSearch}/>
                <div>
                    <ul className="places_list" places={this.props.place} >
                        { markers.filter(m => m.getVisible()).map((m, i) =>
                            (<li role="link" className="location_item" key={i} data-placeid={m.index} tabIndex="0">{m.title}</li>))
                        }
                    </ul>
                </div>
            </div>
        )

	}
}

export default ListPlaces