
import Streetview from 'react-google-streetview';

// component to render the Google Street view for a car park details page
function CarparkStreetView(props) {
    const googleApiKey =  process.env.REACT_APP_GOOGLE_API_KEY

    // see https://developers.google.com/maps/documentation/javascript/3.exp/reference#StreetViewPanoramaOptions
    const streetViewPanoramaOptions = {
        position: {lat: props.lat, lng: props.lng},
        pov: {heading: 100, pitch: 0},
        zoom: 1
    };

    return (
        <div style={{
            width: '800px',
            height: '450px',
            backgroundColor: '#eeeeee'
        }}>
            <Streetview
                apiKey={googleApiKey}
                streetViewPanoramaOptions={streetViewPanoramaOptions}
            />
        </div>
    );
}
export default CarparkStreetView;
