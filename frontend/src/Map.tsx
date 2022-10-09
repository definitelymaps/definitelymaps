import React, { useEffect } from "react";

import "leaflet/dist/leaflet.css";

import {
  useMap,
  MapContainer,
  TileLayer,
  CircleMarker,
  Polyline,
} from "react-leaflet";

import {
  useStore,
  selectClicks,
  selectHovers,
  onMapMouseHover,
  onMapMouseClick,
  onMapBoundsChange,
  onMapKeyPressed,
} from "./store";

import {
  useMapMouseClickPosition,
  useMapMouseHoverPosition,
  useMapCenterPosition,
  useIsMobileScreen,
  useHasHoverInput,
  useMapBounds,
  useMapKeypress,
} from "./hooks";

import "./Map.css";


const Map = () => {
  const wantsClicks = useStore(state => state.activeTool) === "marker";
  const wantsHovers = useStore(state => state.activeTool) === "draw";

  const remoteClicks = useStore(selectClicks);
  const remoteHovers = useStore(selectHovers);

  const isMobileScreen = useIsMobileScreen();
  const hasHoverInput = useHasHoverInput();

  return (
    <MapContainer
      id="MapContainer"
      center={[52.5216, 13.4139]}
      zoom={16}
      zoomControl={false}
      maxBounds={[[-90,-180], [90,180]]}
      maxBoundsViscosity={1}
      doubleClickZoom={false}
      scrollWheelZoom={true}
    >

      <TileLayer
        attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        minZoom={3}
        maxZoom={19}
        noWrap={true}
      />

      <MapBounds />

      <MapKeypress />

      { wantsClicks && <MapMouseClick /> }

      { wantsHovers && hasHoverInput && <MapMouseHover /> }
      { wantsHovers && !hasHoverInput && <MapCenterHover /> }

      { remoteClicks.map(click => {
        return (<CircleMarker
          key={click.tag}
          interactive={false}
          center={[click.lat, click.lng]}
          pathOptions={{
            weight: 1,
            color: "var(--color-grey-700)",
            opacity: 0.7,
            fillColor: "var(--color-purple-700)",
            fillOpacity: 0.7,
          }}
          radius={20}
        />)
      }) }

      <Polyline
        positions={remoteHovers.map(v => [v.lat, v.lng])}
        pathOptions={{
          weight: 10,
          color: "var(--color-purple-500)",
          opacity: 0.7,
        }}
      />

    </MapContainer>
  );
};


const MapMouseClick = () => {
  const map = useMap();
  const clickPosition = useMapMouseClickPosition();

  useEffect(() => {
    if (clickPosition) {
      onMapMouseClick(clickPosition.lng, clickPosition.lat, map.getZoom());
    }
  }, [map, clickPosition]);

  return null;
};

const MapMouseHover = () => {
  const map = useMap();
  const hoverPosition = useMapMouseHoverPosition();

  useEffect(() => {
    if (hoverPosition) {
      onMapMouseHover(hoverPosition.lng, hoverPosition.lat, map.getZoom());
    }
  }, [map, hoverPosition]);

  return null;
};

const MapCenterHover = () => {
  const map = useMap();
  const centerPosition = useMapCenterPosition();

  useEffect(() => {
    if (centerPosition) {
      onMapMouseHover(centerPosition.lng, centerPosition.lat, map.getZoom());
    }
  }, [map, centerPosition]);

  return null;
};

const MapBounds = () => {
  const map = useMap();
  const bounds = useMapBounds();

  useEffect(() => {
    if (bounds) {
      onMapBoundsChange(
        bounds.getWest(),
        bounds.getSouth(),
        bounds.getEast(),
        bounds.getNorth(),
        map.getZoom());
    }
  }, [map, bounds]);

  return null;
};

const MapKeypress = () => {
  const event = useMapKeypress();

  useEffect(() => {
    if (event) {
      onMapKeyPressed(event.key);
    }
  }, [event]);

  return null;
};

export default Map;
