import create from "zustand";
import produce from "immer";
import { createSelector } from "reselect";

import guid from "./guid";
import { onMapMouseClickEmit, onMapMouseHoverEmit } from "./net"


// The global store holding all global state for our application
export interface Store {
  userTag: string;

  online: boolean;
  viewers: number;

  title: string;
  activeTool: Tool;

  z: number;
  bounds: Bounds;

  clicks: MapClickEvent[];
  hovers: MapHoverEvent[];
}

// The initial global state of our application
const initialStore: Store = {
  userTag: guid(),

  online: false,
  viewers: 1,

  title: "Untitled",
  activeTool: null,

  z: 16,
  bounds: [-90, -180, 90, 180],

  clicks: [],
  hovers: [],
};

// The selected tool from the bottom toolbar
type Tool = "draw" | "marker" | "text" | "sticker" | null;

// Bounding box: left/west, bottom/south, right/east, top/north
type Bounds = [number, number, number, number];

// Map click from others we receive from the websocket server
export interface MapClickEvent {
  tag: string;

  z: number;
  lng: number;
  lat: number;

  received: number;
}

// Map hover from others we receive from the websocket server
export interface MapHoverEvent {
  tag: string;

  z: number;
  lng: number;
  lat: number;

  received: number;
}

// The exported store to use below and in the react components
export const useStore = create<Store>((set) => initialStore);
export const resetStore = () => useStore.setState(initialStore);

// Send mouse clicks from the map to the server
export const onMapMouseClick = async (lng: number, lat: number, z: number) => {
  const { userTag, online, viewers, activeTool } = useStore.getState();

  if (activeTool !== "marker") {
    return;
  }

  if (online && viewers > 1) {
    onMapMouseClickEmit(userTag, lng, lat, z);
  }

  useStore.setState(
    produce((state) => {
      state.clicks.push({
        tag: guid(),
        z: z,
        lng: lng,
        lat: lat,
        received: Date.now(),
      });
    })
  );
};

// Send mouse hovers from the map to the server
export const onMapMouseHover = async (lng: number, lat: number, z: number) => {
  const { userTag, online, viewers, activeTool } = useStore.getState();

  if (activeTool !== "draw") {
    return;
  }

  if (online && viewers > 1) {
    onMapMouseHoverEmit(userTag, lng, lat, z);
  }

  useStore.setState(
    produce((state) => {
      state.hovers.push({
        tag: guid(),
        z: z,
        lng: lng,
        lat: lat,
        received: Date.now(),
      });
    })
  );
};

export const onMapBoundsChange = (w: number, s: number, e: number, n: number, z: number) => {
  useStore.setState(
    produce((state) => {
      state.z = z;
      state.bounds = [w, s, e, n];
    })
  );
};


export const onActiveToolChanged = (tool: Tool) => {
  useStore.setState(
    produce((state) => {
      state.activeTool = tool;
    })
  );
};

export const onMapKeyPressed = (key: string) => {
  const activeTool = useStore.getState().activeTool;

  switch (key) {
    case "d":
      onActiveToolChanged(activeTool === "draw" ? null: "draw");
      break;
    case "m":
      onActiveToolChanged(activeTool === "marker" ? null: "marker");
      break;
    case "t":
      onActiveToolChanged(activeTool === "text" ? null: "text");
      break;
    case "s":
      onActiveToolChanged(activeTool === "sticker" ? null: "sticker");
      break;
  }
};

export const selectActiveTool = (state: Store) => state.activeTool
export const selectClicks = (state: Store) => state.clicks
export const selectHovers = (state: Store) => state.hovers
export const selectTitle = (state: Store) => state.title
