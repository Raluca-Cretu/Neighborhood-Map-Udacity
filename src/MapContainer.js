import React, {Component} from 'react'



class MapContainer extends Component {

	state = {
		markers: [],
		places: [],
		error: null,
		mapError: null,
		infobox: new this.props.google.maps.InfoWindow(),
		highlightedIcon: null
	}

	//Fetch data from Foursquare 
	componentDidMount() {
		const url = 'https://api.foursquare.com/v2/venues/search?ll=48.8015423,9.52962&client_id=2ZMPRLINC4X0LQURACBFQUFWSWI55KVTBCBCG44RDEH3OJTW&client_secret=TS1ITUBV1K03MXUPFQDOFVZAEVF1GM45023JXVO5F1CT3SOI&v=20180801'

        fetch(url)
        	// Check if the data is ok
            .then(data => {
                if(data.ok) {
                  return data.json()
                } else {
                  throw new Error(data.statusText)
                }
            })
            //Add the responses in the places array and call/ initialize the map
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
            this.addMarkers()
        }else {
            this.setState({mapError: "map error"})
        }
    }

    addMarkers = () => {
    	//const {markers} = this.this.state
    	const {google} = this.this.props
    	const bounds = new google.maps.LatLngBounds()
    	let {infowindow}    = this.state
    	let i=0


    	this.state.places.forEach( (location) => {

	    	const marker = new google.maps.Marker({
                position: new google.maps.LatLng( location.location.lat,  location.location.lng),
                map: this.map,
                title: location.name,
                index: i
	        })
	        i++

	        marker.addListener('click', () => {
	        	const defaultIcon = marker.getIcon()//google map specific
	        	const {highlightedIcon} = this.state

	        	// if there is already a window open than close it
                if (infowindow) {
                    infowindow.close()
                }
                this.reset_markers()

                //Add Content to Info window
                infowindow = new google.maps.InfoWindow({ //google map specific
                    content:    location.name+" in  "+location.location.city
                });
                infowindow.open( this.map, marker)//google map specific

                //add animation and highlight the marker
                marker.setAnimation(google.maps.Animation.BOUNCE)
                marker.setIcon(highlightedIcon)

                infowindow.addListener('closeclick', () => { //google map specific
                    infowindow.marker = null
                    marker.setIcon(defaultIcon)
                    marker.setAnimation(null)
                });
	    	})

	    	this.setState((state) => ({
                markers: [...state.markers, marker]

            }))

            bounds.extend(marker.position)
    	})

    	console.log( "x "+this.state.markers)
        this.map.fitBounds(bounds)
    }



	render() {
		return (
			<div className="main_wrapper">
				<div className="map" id="googleMap" role="application">
			
				</div>
			</div>
		)
	}
}

export default MapContainer