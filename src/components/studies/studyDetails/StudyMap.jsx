// import * as React from 'react';
import Map, { 
    Marker,
    Popup,
    NavigationControl,
    FullscreenControl,
    GeolocateControl, 
    } from 'react-map-gl';
  import { useState, useMemo} from 'react'
  import 'mapbox-gl/dist/mapbox-gl.css';
  import Pin from './Pin';
  import './studyMap.css';
  import mapboxgl from 'mapbox-gl';
  
  
  const StudyMap = ({ observations }) => {
  
    const [popupDisplay, setPopupDisplay] = useState(null)
    const [currentGeolocation, setCurrentGeolocation] = useState(null)

    // MAKE ALL MARKERS VISIBLE ON INITIAL RENDERING OF MAP
    /* This function creates an instance of `LngLatBounds` from the MapboxGl library that the Map can use to 
       set the initial view and allow all of the observation markers to be visible. The LngLatBounds object 
       characterizes an imaginary bounding box with two properties: a coordinate for the northeast corner, and 
       a coordinate for the southwest corner. First, an object with null values is initialized. Next, the .extend()
       method incrementally expands the bounding box to include each coordinates for the markers in the `observations`
       array. As this happens, the NE and SW properties are automatically calculated and normalized to account for
       point near the edge of the map or across the antimeridian.  */

    const initialMapBounds = useMemo(() => {
      if (observations.length >= 1) {
        let mapBounds = new mapboxgl.LngLatBounds()
        observations.forEach((obs) => {
          mapBounds.extend([obs.longitude, obs.latitude])
        })
        return mapBounds
        // If there are no observations yet, set initialMapBounds to null 
      } else if (observations.length < 1) {
        /* Since the initialMapBounds are null, the view of the map will default to the longitude,
        latitude, and zoom defined in the initialStateView prop of the Map component, so
        0, 0, and 1, respectively. */
        return null
      }
    } ,[observations])
    
    //CREATE MARKER ON MAP FOR EACH OBSERVATION
    const markers = useMemo(() => observations.map(obj => (
      <Marker key={obj.id}
        longitude={obj.longitude}
        latitude={obj.latitude}
        anchor="bottom"
        onClick={e => {
          // If we let the click event propagates to the map, it will immediately close the popup
          // with `closeOnClick: true`
          e.originalEvent.stopPropagation();
          setPopupDisplay(obj);
        }}
      >
        <div
        onMouseOver={() => {
          setPopupDisplay(obj)}}
        onMouseLeave={() => {
            setPopupDisplay(null)}}
        >
          <Pin />
        </div>
      </Marker>)
    ), [observations]);
    
    const API_KEY = import.meta.env.VITE_MAPBOX_TOKEN
  
    return (
      <section className="studyMapContainer">
        <Map
        mapboxAccessToken={API_KEY}
        id="studyDetails__map"
        initialViewState={{
          bounds: initialMapBounds,
          fitBoundsOptions: {padding: 50},
          longitude: 0,
          latitude: 0,
          zoom: 1
        }}
        style={{width: '100%', height: '75vh'}}
        reuseMaps
        mapStyle="mapbox://styles/mapbox/outdoors-v12"
        projection={"mercator"}
      >
        <GeolocateControl position="top-left"
        onGeolocate={(e) => setCurrentGeolocation({
          longitude: e.coords.longitude,
          latitude: e.coords.latitude
        })}
         />
         {currentGeolocation && (
            <Popup
              anchor="bottom"
              longitude={currentGeolocation.longitude}
              latitude={currentGeolocation.latitude}
              offsetTop={-30}
              closeButton={false}
              onClose={() => setCurrentGeolocation(null)}
            >
              <div className="popup">
                {currentGeolocation.latitude}°, {currentGeolocation.longitude}°
              </div>
            </Popup>
          )}
        <FullscreenControl position="top-left" />
        <NavigationControl position="top-left" />
        {markers}
        {popupDisplay && (
            <Popup
              longitude={popupDisplay.longitude}
              latitude={popupDisplay.latitude}
              offset={15}
              closeButton={false}
              onClose={() => setPopupDisplay(null)}
            >
              <div className="popup">
                {
                    popupDisplay.image.length > 0 &&
                    <section className="popup__ImgContainer">
                        <div className="popup__ImgWrapper">
                            <img className="popup--Img" src={popupDisplay?.image} alt="observation"></img>
                        </div>
                    </section>
                }
                {
                    popupDisplay.description.length > 0 &&
                    <div>"{popupDisplay?.description}"</div>
                }
                Observation made by {popupDisplay.participant_name} on {popupDisplay.date}
              </div>
            </Popup>
          )}
      </Map>
      </section>
    )
  }
  
  export default StudyMap
