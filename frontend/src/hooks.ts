import { useState, useEffect } from "react";

import { LeafletKeyboardEvent, LeafletMouseEvent, LatLng, LatLngBounds } from "leaflet";
import { useMap, useMapEvent } from "react-leaflet";


export const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);

    if (media.matches !== matches) {
      setMatches(media.matches);
    }

    const listener = () => setMatches(media.matches);

    window.addEventListener("resize", listener);

    return () => window.removeEventListener("resize", listener);
  }, [matches, query]);

  return matches;
};

export const useIsMobileScreen = () => {
  return useMediaQuery("(max-width: 600px)");
};

export const useHasReducedMotion = () => {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
};

export const useHasHoverInput = () => {
  return useMediaQuery("(hover: hover)");
};


export const useMapMouseClickPosition = () => {
  const [position, setPosition] = useState<LatLng | null>(null);

  useMapEvent("click", (e: LeafletMouseEvent) => {
    setPosition(e.latlng);
  });

  return position;
};

export const useMapMouseHoverPosition = () => {
  const [position, setPosition] = useState<LatLng | null>(null);

  useMapEvent("mousemove", (e: LeafletMouseEvent) => {
    setPosition(e.latlng);
  });

  return position;
};

export const useMapCenterPosition = () => {
  const map = useMap();
  const [position, setPosition] = useState<LatLng | null>(map.getCenter());

  const map2 = useMapEvent("move", () => {
    setPosition(map2.getCenter());
  });

  return position;
};

export const useMapBounds = () => {
  const map = useMap();
  const [bounds, setBounds] = useState<LatLngBounds>(map.getBounds());

  const map2 = useMapEvent("moveend", () => {
    setBounds(map2.getBounds());
  });

  return bounds;
};

export const useMapKeypress = () => {
  const [event, setEvent] = useState<KeyboardEvent | null>(null);

  useMapEvent("keypress", (e: LeafletKeyboardEvent) => {
    setEvent(e.originalEvent);
  });

  return event;
};
