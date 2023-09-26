import Map, { 
    Popup,
    NavigationControl,
    FullscreenControl,
    GeolocateControl } from 'react-map-gl';
  import { useState, useEffect, useRef } from 'react'
  import 'mapbox-gl/dist/mapbox-gl.css';
  
  
  const ObservationFormMap = ({ observation, updateObservation, setShowMap }) => {
  
    const [currentGeolocation, setCurrentGeolocation] = useState(null)
    const [locateControlMounted, setLocateControlMounted] = useState(false)
    const [locationLoaded, setLocationLoaded] = useState(false)
    
    // GET GEOLOCATION WITH MAP CONTROLS USING USEREF()
    const geoControlRef = useRef(null);
    
    /* The geolocation controls are added to the map after the initial rendering of the map occurs,
     and there isn't a built in method for finding out when the controls are fully mounted so that they 
     can be interacted with. This function uses the Map's built in onRender() method to continue checking 
     if the reference to geolocateControl has a truthy value for its ._setup property while the map finishes 
     rendering. When ._setup is true, the controls have been fully added to the map.
    */
    const isControlMounted = () => {
        if (!locateControlMounted && geoControlRef?.current?._setup) {
            setLocateControlMounted(true)
        }
    }

    // When component is initially rendered and map has been fully loaded, trigger geolocation
    useEffect(
        () => {
            if (locateControlMounted && !locationLoaded) {
                console.log("location controls mounted")
                geoControlRef.current?.trigger();
                setLocationLoaded(true)
            }
        },
        [locateControlMounted]
    )

    const handleGeolocateClick = (e) => {
        e.preventDefault()
        geoControlRef.current?.trigger();
      }

    const handleSetCoordinates = (e) => {
        const copy = {
            ...observation,
            longitude: e.coords.longitude,
            latitude: e.coords.latitude
        }
        updateObservation(copy)

        setCurrentGeolocation({
            longitude: e.coords.longitude,
            latitude: e.coords.latitude
          })
    }
  
    
    const API_KEY = import.meta.env.VITE_MAPBOX_TOKEN
  
      return (<>
          <button className="btn__medium fadeIn"
              onClick={(e) => { handleGeolocateClick(e) }}
          >Use My Location</button>

          <section className="observationMapContainer fadeIn">
              <Map
                  mapboxAccessToken={API_KEY}
                  id="observationForm__map"
                  initialViewState={{
                      longitude: 0,
                      latitude: 0,
                      zoom: 2
                  }}
                  style={{ width: '100%', height: '55vh' }}
                  onRender={isControlMounted}
                  projection={"mercator"}
                  reuseMaps
                  mapStyle="mapbox://styles/mapbox/outdoors-v12"
              >
                  <GeolocateControl position="top-left"
                      ref={geoControlRef}
                      onGeolocate={(e) => { handleSetCoordinates(e) }}
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
                          <div className="observationMap_popup">
                              {currentGeolocation.latitude}°, {currentGeolocation.longitude}°
                          </div>
                      </Popup>
                  )}
                  <FullscreenControl position="top-left" />
                  <NavigationControl position="top-left" />
              </Map>
          </section>
          <button className="btn__cancel__small" onClick={(e) => {
            e.preventDefault
            setLocateControlMounted(false)
            setLocationLoaded(false)
            setShowMap(false)
          }}>Close</button>
      </>
    )
  }
  
  export default ObservationFormMap
