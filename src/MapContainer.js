import React, {Component} from 'react'
import ListPlaces from './ListPlaces'


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

            this.setState({highlightedIcon: this.changeMarkerColor('e0ff25')})
            this.setState({normalIcon: this.changeMarkerColor('ea4335')})

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
    	const {google} = this.props
    	const bounds = new google.maps.LatLngBounds()
    	let {infowindow}    = this.state
    	let i=0

    	// for each place in the array create a Marker
    	this.state.places.forEach( (location) => {

	    	const marker = new google.maps.Marker({
                position: new google.maps.LatLng( location.location.lat,  location.location.lng),
                map: this.map,
                title: location.name,
                index: i
	        })
	        i++

	        // add an event Listener to open a InfoWindow when a Marker is clicked
	        marker.addListener('click', () => {
	        	const defaultIcon = marker.getIcon()//google map specific
	        	const {highlightedIcon} = this.state

	        	// if there is already a window open than close it
                if (infowindow) {
                    infowindow.close()
                }
                this.resetMarkers()

                //add Ccontent to Info window
                infowindow = new google.maps.InfoWindow({ //google map specific
                    content: location.name +" in  " + location.location.city
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

	//google map specific function
    changeMarkerColor = (markerColor) => {
        const {google} = this.props
        let markerImage = new google.maps.MarkerImage(
          'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|'+ markerColor +
          '|40|_|%E2%80%A2',
          new google.maps.Size(21, 34),
          new google.maps.Point(0, 0),
          new google.maps.Point(10, 34),
          new google.maps.Size(21,34));
        return markerImage;
    }

    //after clicking on another marker the previos clicked marker is set up to normal
    resetMarkers = () => {
        const { places, markers, normalIcon} = this.state

        places.forEach((l,i) => {
            markers[i].setIcon(normalIcon)
            markers[i].setAnimation(null)
        })
    }


	render() {
		const {markers} = this.props
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
			<div className="main_wrapper">
				<div className="sidebar">
				input aria-label="Input filter places:" type='text' value={this.state.value} onChange={this.startSearch}/>
				</div>
				<ListPlaces markers={[markers]} />
				<div className="map" id="googleMap" role="application" aria-label="Map showing places">
				</div>
			</div>
		)
	}
}

export default MapContainer