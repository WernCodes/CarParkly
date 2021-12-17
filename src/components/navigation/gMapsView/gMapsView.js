import React  from 'react';
import {GoogleApiWrapper, Marker, InfoWindow} from 'google-maps-react';
import CurrentLocation from "./currentLocation";

const mapStyles = {
    width: '100%',
    height: '100%'
};
const googleApiKey =  process.env.REACT_APP_GOOGLE_API_KEY
class MapContainer extends React.Component {
    state = {
        showingInfoWindow: false,  // Hides or shows the InfoWindow
        activeMarker: {},          // Shows the active marker upon click
        selectedPlace: {}          // Shows the InfoWindow to the selected place upon a marker
    };

    onMarkerClick = (props, marker) =>
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
        });

    onClose = props => {
        if (this.state.showingInfoWindow) {
            this.setState({
                showingInfoWindow: false,
                activeMarker: null
            });
        }
    };

    render() {
        this.markers = [{name:"test1", pos:{lat: 1.3606523384496456, lng: 103.9598881454846}}, {name:"test2", pos:{lat: 1.266633203717416, lng: 103.85615195966469}}]
        let markerList = this.markers.map((marker,index) =>
            <Marker
                onClick={this.onMarkerClick}
                name={marker.name}
                position={marker.pos}
            />)
        return (
            <div className="mapArea">
                <CurrentLocation
                    centerAroundCurrentLocation
                    google={this.props.google}
                >
                    {markerList}
                <InfoWindow
                    marker={this.state.activeMarker}
                    visible={this.state.showingInfoWindow}
                    onClose={this.onClose}
                >
                    <div>
                        <h4>{this.state.selectedPlace.name}</h4>
                    </div>
                </InfoWindow>
                </CurrentLocation>
            </div>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: googleApiKey,
    libraries: ['places']

})(MapContainer);