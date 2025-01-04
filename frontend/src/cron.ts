import { produce } from "immer";

import { MapClickEvent, MapHoverEvent } from "./store";
import { useStore, Store } from "./store";


// Global timers ticking e.g. every 500 ms to clean the store
// of old data, and in general to change state based on time
let clickTimer: number | undefined = undefined;
let hoverTimer: number | undefined = undefined;

// The timer cleaning out stored clicks in our global state
export const setClickTimer = () => {
  if (clickTimer) {
    return;
  }

  clickTimer = window.setInterval(() => {
    useStore.setState(
      produce((state: Store) => {
        state.clicks = state.clicks.filter((click: MapClickEvent) => {
          return (Date.now() - click.received) < 1000;
        });
      })
    );
  }, 500);
};

export const clearClickTimer = () => {
  if (!clickTimer) {
    return;
  }

  clearInterval(clickTimer);
  clickTimer = undefined;
};

// The timer cleaning out stored hovers in our global state
export const setHoverTimer = () => {
  if (hoverTimer) {
    return;
  }

  hoverTimer = window.setInterval(() => {
    useStore.setState(
      produce((state: Store) => {
        state.hovers = state.hovers.filter((hover: MapHoverEvent) => {
          return (Date.now() - hover.received) < 1000;
        });
      })
    );
  }, 100);
};

export const clearHoverTimer = () => {
  if (!hoverTimer) {
    return;
  }

  clearInterval(hoverTimer);
  hoverTimer = undefined;
};
