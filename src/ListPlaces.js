import React, {Component} from 'react'


class ListPlaces extends Component {

	componentDidMount() {
		this.onclickLocation(this.props)
	}

	// when a place on the list is clicked pops up the marker
    onclickLocation = (props) => {

        document.querySelector('.places_list').addEventListener('click', function (e) {
            if(e.target && e.target.nodeName === "LI") {
                let marker_index=e.target.getAttribute('data-placeid');
                props.callbackFromList(marker_index);
            }
        })
    }

	render () {
        //let markers = this.props.markersFromParent

		return (
            <ul className="places_list" tabIndex="0" aria-label="List of favorites places">
            	{
                	this.props.markersFromParent.filter(m => m.getVisible()).map((m, i) =>
                    (<li role="button"className="location_item" key={i} data-placeid={m.index} tabIndex="0">{m.title}</li>))
                }
            </ul>
        )
	}
}

export default ListPlaces