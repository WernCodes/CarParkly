import React  from 'react';
import {Map, GoogleApiWrapper, Marker, InfoWindow} from 'google-maps-react';
import CurrentLocation from "./currentLocation";

const mapStyles = {
    width: '100%',
    height: '100%'
};
class MapContainer extends React.Component {
    state = {
        showingInfoWindow: false,  // Hides or shows the InfoWindow
        activeMarker: {},          // Shows the active marker upon click
        selectedPlace: {}          // Shows the InfoWindow to the selected place upon a marker
    };

    onMarkerClick = (props, marker, e) =>
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
        return (
            <div className="mapArea">
                <CurrentLocation
                    centerAroundCurrentLocation
                    google={this.props.google}
                >
                <Marker
                    onClick={this.onMarkerClick}
                    name={'Current Location'}
                />
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
    apiKey: 'AIzaSyAqw1l369OhIge-RdhCRsoccq5WDzSA0MQ'

})(MapContainer);