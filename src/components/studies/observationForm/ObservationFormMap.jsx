import Map, { 
    Popup,
    NavigationControl,
    FullscreenControl,
    GeolocateControl } from 'react-map-gl';
  import { useState, useEffect, useRef, useCallback } from 'react'
  import 'mapbox-gl/dist/mapbox-gl.css';
  
  
  const ObservationFormMap = ({ observation, updateObservation, setShowMap }) => {
  
    const [currentGeolocation, setCurrentGeolocation] = useState(null)
    const [mapLoaded, setMapLoaded] = useState(false)
    const [locateControlMounted, setLocateControlMounted] = useState(false)
    const [locationLoaded, setLocationLoaded] = useState(false)
    
    // GET GEOLOCATION WITH MAP CONTROLS USING USEREF()
    const geoControlRef = useRef(null);
  
    useEffect(
      () => {
        if (currentGeolocation) {
          console.log("current location", currentGeolocation)
        }
      },
      [currentGeolocation]
    )
    
    // This function runs when the first visually complete rendering of the map component has occurred.
    const onMapLoad = useCallback(() => {
        if (mapLoaded === false) {
            console.log("onMapLoad running", "mapLoaded:", mapLoaded)
            setMapLoaded(true)
        }
      }, []);
    
    /* The geolocation controls are added to the map after onMapLoad() runs, and there isn't a built in 
       method for finding out when the controls are fully mounted so that they can be interacted with. 
       This function uses the Map's built in onRender() method to continue checking if the reference to
       geolocateControl has a truthy value for its ._setup property while the map finishes rendering. When
       ._setup is true, the controls have been fully added to the map.
    */
    const isControlMounted = () => {
        if (mapLoaded && !locateControlMounted && geoControlRef.current._setup) {
            setLocateControlMounted(true)
            console.log("geoControlRef is set up")
        }
    }

    // When component is initially rendered and map has been fully loaded, trigger geolocation
    useEffect(
        () => {
            if (locateControlMounted && mapLoaded && !locationLoaded) {
                geoControlRef.current?.trigger();
                setLocationLoaded(true)
            }
        },
        [locateControlMounted, mapLoaded]
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
          <button onClick={(e) => {handleGeolocateClick(e)}}>Use My Location</button>

          <section className="observationMapContainer">
              <Map
                  mapboxAccessToken={API_KEY}
                  initialViewState={{
                      longitude: 0,
                      latitude: 0,
                      zoom: 2
                  }}
                  style={{ width: '100%', height: '45vh' }}
                  onLoad={onMapLoad}
                  onRender={isControlMounted}
                  reuseMaps
                  mapStyle="mapbox://styles/mapbox/outdoors-v11"
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
                          <div>
                              {currentGeolocation.latitude}°, {currentGeolocation.longitude}°
                          </div>
                      </Popup>
                  )}
                  <FullscreenControl position="top-left" />
                  <NavigationControl position="top-left" />
              </Map>
          </section>
          <button onClick={(e) => {
            e.preventDefault
            setMapLoaded(false)
            setLocateControlMounted(false)
            setLocationLoaded(false)
            setShowMap(false)
          }}>Close</button>
      </>
    )
  }
  
  export default ObservationFormMap
