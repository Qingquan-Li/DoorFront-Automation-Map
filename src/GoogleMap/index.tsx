import React from "react";
import {
  GoogleMapContainerStyle,
  MapContainerStyle,
  StreetViewContainerStyle,
} from "./GoogleMap.style";
import makeAsyncScriptLoader from "react-async-script";
import { combineMapOptions } from "./utils/mapTool";
import {
  bindStreetViewEvents,
  combineStreetViewOptions,
  StreetViewEvents,
} from "./utils/streetViewTool";
import { isEqual } from "lodash";

export interface GoogleMapProps {
  google?: typeof google;
  streetViewEvents?: StreetViewEvents;
  mapConfig: google.maps.MapOptions;
  streetViewConfig: google.maps.StreetViewPanoramaOptions;
  isNextPosition: boolean;
  setIsNextPosition: React.Dispatch<React.SetStateAction<boolean>>;
}

function GoogleMap({
  google,
  streetViewEvents,
  mapConfig,
  streetViewConfig,
  isNextPosition,
  setIsNextPosition,
}: GoogleMapProps) {
  const [map, setMap] = React.useState<google.maps.Map | null>(null);
  const [streetView, setStreetView] =
    React.useState<google.maps.StreetViewPanorama | null>(null);
  const _map = React.useRef<HTMLDivElement>(null);
  const _streetView = React.useRef(null);
  const _isMounted = React.useRef(false);
  // const _panoID = React.useRef("");

  /* -------------------------------------------------------------------------- */
  /*                                Global State                                */
  /* -------------------------------------------------------------------------- */

  React.useEffect(() => {
    if (google && !_isMounted.current) {
      if (!map && !streetView) {
        setMap(
          new google.maps.Map(_map.current!, combineMapOptions(mapConfig))
        );
        setStreetView(
          new google.maps.StreetViewPanorama(
            _streetView.current!,
            combineStreetViewOptions(streetViewConfig)
          )
        );
      }

      if (map && streetView && google !== null) {
        _isMounted.current = true;
        map.setStreetView(streetView);
        streetViewEvents &&
          bindStreetViewEvents(streetView, streetViewEvents, map);
      }
    }

    // Change _isMounted value
    if (google && map && streetView && _isMounted.current && isNextPosition) {
      // console.log("Update map...", mapConfig);
      _isMounted.current = false;
      setIsNextPosition(false);
      setMap(new google.maps.Map(_map.current!, combineMapOptions(mapConfig)));
      setStreetView(
        new google.maps.StreetViewPanorama(
          _streetView.current!,
          combineStreetViewOptions(streetViewConfig)
        )
      );
    }

    return () => {
      if (map && google) {
        google.maps.event.clearInstanceListeners(map);
      }
    };
  }, [google, map, streetView, streetViewEvents, mapConfig, streetViewConfig]);

  return (
    <>
      {google && (
        <div id="GoogleMapContainer" style={GoogleMapContainerStyle}>
          <div id="StreetViewContainer" style={StreetViewContainerStyle}>
            <div
              id="StreetView"
              ref={_streetView}
              style={{ width: "100%", height: "100%" }}
              className="StreetViewContainer"
            />
          </div>
          <div
            id="MapContainer"
            className="MapContainer"
            style={MapContainerStyle}
          >
            <div
              id="Map"
              ref={_map}
              style={{ width: "100%", height: "100%" }}
            />
          </div>
        </div>
      )}
    </>
  );
}

// const api = process.env.REACT_APP_API_KEY;
const api = import.meta.env.VITE_API_KEY;
const url = `https://maps.googleapis.com/maps/api/js?key=${api}&libraries=&v=weekly&channel=2&libraries=places`;
export default makeAsyncScriptLoader(url, {
  globalName: "google",
})(GoogleMap);
