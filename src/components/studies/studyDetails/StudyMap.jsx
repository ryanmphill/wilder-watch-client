// import * as React from 'react';
import Map, { 
    Marker,
    Popup,
    NavigationControl,
    FullscreenControl,
    GeolocateControl, 
    } from 'react-map-gl';
  import { useState, useEffect, useMemo} from 'react'
  import 'mapbox-gl/dist/mapbox-gl.css';
  import Pin from './Pin';
  import './studyMap.css';
import mapboxgl from 'mapbox-gl';
  
  
  const StudyMap = ({ observations, centerLon, centerLat, furthestLon, furthestLat }) => {
  
    const [popupDisplay, setPopupDisplay] = useState(null)
    const [currentGeolocation, setCurrentGeolocation] = useState(null)
    // State needed to set the initial view of the map
    const [initialMapBounds, setInitialMapBounds] = useState(null)
    const [startingViewLoaded, setViewLoaded] = useState(false)

    // MAKE ALL MARKERS VISIBLE ON INITIAL RENDERING OF MAP ///////////////////////////////////////////////////////////
    /* This useEffect takes the center observation point and the point furthest from it (both calculated by the server) 
        to set the initial map view. The mapbox gl library lets us create instances of the LngLat class and use those
        instances to get the radius in meters and then create a `LngLatBounds` object that the Map can use to set the initial view
        that will allow all of the observation markers to be visible. */
    useEffect(
        () => {
            if (typeof centerLon === 'number' && typeof centerLat === 'number' && furthestLon && furthestLat) {
                let mapBounds = new mapboxgl.LngLatBounds()
                observations.forEach((obs) => {
                  mapBounds.extend([obs.longitude, obs.latitude])
                })
                // const center = new mapboxgl.LngLat(centerLon, centerLat)
                // const furthest = new mapboxgl.LngLat(furthestLon, furthestLat)
                // const radius = center.distanceTo(furthest)
                // const mapBounds = center.toBounds(radius)
                console.log(mapBounds)
                setInitialMapBounds(mapBounds)
            // If there are no observations yet, the center points default to zero, and the furthest points will be null 
            } else if (typeof centerLon === 'number' && typeof centerLat === 'number' && furthestLon === null && furthestLat === null) {
                /* Set startingViewLoaded to true to allow rendering of map. Since the initialMapBounds are null, the view of
                the map will default to the longitude, latitude, and zoom defined in the initialStateView prop of the Map component, so
                0, 0, and 1, respectively. */
                setViewLoaded(true)
            }
        },
        [centerLon, centerLat, furthestLon, furthestLat]
    )

    // If and when the initial map bounds are set, set startingViewLoaded to true and allow rendering of map
    useEffect(
      () => {
        if (initialMapBounds !== null && !startingViewLoaded) {
          setViewLoaded(true)
        }
      },
      [initialMapBounds, startingViewLoaded, setViewLoaded]
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
    startingViewLoaded &&
      <section className="studyMapContainer">
        <Map
        mapboxAccessToken={API_KEY}
        initialViewState={{
          bounds: initialMapBounds,
          fitBoundsOptions: {padding: 50},
          longitude: centerLon,
          latitude: centerLat,
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
