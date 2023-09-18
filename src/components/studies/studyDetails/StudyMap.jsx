// import * as React from 'react';
import Map, { 
    Marker,
    Popup,
    NavigationControl,
    FullscreenControl,
    GeolocateControl } from 'react-map-gl';
  import { useState, useEffect, useMemo, useRef } from 'react'
  import 'mapbox-gl/dist/mapbox-gl.css';
  import Pin from './Pin';
  import './studyMap.css';
  
  
  const StudyMap = ({ observations }) => {
  
    const [popupDisplay, setPopupDisplay] = useState(null)
    const [currentGeolocation, setCurrentGeolocation] = useState(null)
  
    useEffect(
      () => {
        if (currentGeolocation) {
          console.log("current location", currentGeolocation)
        }
      },
      [currentGeolocation]
    )
  
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
        <div>
          <h3>Observations</h3>
        </div>
  
        <Map
        mapboxAccessToken={API_KEY}
        initialViewState={{
          longitude: 0,
          latitude: 0,
          zoom: 1
        }}
        style={{width: '100%', height: '80vh'}} //w: 600, h: 400
        reuseMaps
        mapStyle="mapbox://styles/mapbox/outdoors-v11"
      >
        <GeolocateControl position="top-left"
        ref={geoControlRef}
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
              <div>
                {currentGeolocation.latitude}°, {currentGeolocation.longitude}°
              </div>
            </Popup>
          )}
        <FullscreenControl position="top-left" />
        <NavigationControl position="top-left" />
        {markers}
        {popupDisplay && (
            <Popup
              anchor="top"
              longitude={popupDisplay.longitude}
              latitude={popupDisplay.latitude}
              offsetTop={-30}
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
