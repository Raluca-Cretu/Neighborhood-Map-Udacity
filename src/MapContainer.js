import React, {Component} from 'react'



class MapContainer extends Component {

	state = {
		places: [],
		error: null,
		mapError: null
	}


	componentDidMount() {
		const url = 'https://api.foursquare.com/v2/venues/search?ll=48.8015423,9.52962&client_id=2ZMPRLINC4X0LQURACBFQUFWSWI55KVTBCBCG44RDEH3OJTW&client_secret=TS1ITUBV1K03MXUPFQDOFVZAEVF1GM45023JXVO5F1CT3SOI&v=20180801'

        fetch(url)
            .then(data => {
                if(data.ok) {
                  return data.json()
                } else {
                  throw new Error(data.statusText)
                }
            })

            .then(data => {
                this.setState({places: data.response.venues})
                this.loadMap()
                console.log(this.state.places)
                //this.onclickLocation()
            })

            .catch(err => {
                console.log(err)
               this.setState({error: err.toString()})
            })

            //this.setState({highlightedIcon: this.changeMarkerColor('e0ff25')})
            //this.setState({normalIcon: this.changeMarkerColor('ea4335')})

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