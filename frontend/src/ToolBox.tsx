import React, { useState } from "react";

import {
  CursorArrowRaysIcon,
  ChatBubbleBottomCenterIcon,
  MapPinIcon,
  SparklesIcon,
} from "@heroicons/react/20/solid";

import {
  useStore,
  selectActiveTool,
  onActiveToolChanged,
} from "./store";

import "./ToolBox.css";


const ToolBox = () => {
  const activeTool = useStore(selectActiveTool);

  const onDrawClicked = () => onActiveToolChanged(activeTool === "draw" ? undefined : "draw");
  const onMarkerClicked = () => onActiveToolChanged(activeTool === "marker" ? undefined : "marker");
  const onTextClicked = () => onActiveToolChanged(activeTool === "text" ? undefined : "text");
  const onStickerClicked = () => onActiveToolChanged(activeTool === "sticker" ? undefined : "sticker");

  const defaultStyle = "ToolBoxItem";
  const activeStyle = "ToolBoxItem ToolBoxItemSelected";

  return (
    <div className="ToolBox">
      <div className="ToolBoxMenu">
        <div className={activeTool === "draw" ? activeStyle : defaultStyle} onClick={onDrawClicked}>
          <CursorArrowRaysIcon className="ToolBoxItemIcon" />
        </div>
        <div className={activeTool === "marker" ? activeStyle : defaultStyle} onClick={onMarkerClicked}>
          <MapPinIcon className="ToolBoxItemIcon" />
        </div>
        <div className={activeTool === "text" ? activeStyle : defaultStyle} onClick={onTextClicked}>
          <ChatBubbleBottomCenterIcon className="ToolBoxItemIcon" />
        </div>
        <div className={activeTool === "sticker" ? activeStyle : defaultStyle} onClick={onStickerClicked}>
          <SparklesIcon className="ToolBoxItemIcon" />
        </div>
      </div>
    </div>
  );
};


export default ToolBox;
