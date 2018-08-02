import React, {Component} from 'react'



class MapContainer extends Component {

	state = {

	}


	componentDidMount() {
		this.loadMap()

	}


    loadMap() {
        if (this.props && this.props.google) {
            const {google} = this.props
            const mapOptions = {
                zoom: 12,
                scrollwheel: false,
                draggable: true,
                center: new google.maps.LatLng( 48.8015423,  9.529620),
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                streetViewControl: false,
                mapTypeControlOptions: {
                    mapTypeIds: [google.maps.MapTypeId.ROADMAP]
                },
                disableDefaultUI: true,
                gestureHandling: 'cooperative'
            };
            this.map = new google.maps.Map(document.getElementById('googleMap'), mapOptions);
            //this.addMarkers()
        }else {
            this.setState({mapError: "map error"})
        }
    }
	render() {
		return (
			<div className="main_wrapper">
				<div className="map" id="googleMap"> 
				</div>
			</div>
		)
	}
}

export default MapContainer