import React from "react";

import {
  Bars3Icon,
  ShareIcon,
} from "@heroicons/react/20/solid";

import { useStore } from "./store";

import "./TopBar.css";


const TopBar = () => {
  const online = useStore(state => state.online);
  const viewers = useStore(state => state.viewers);

  return (
    <div className="TopBar">
      <div className="TopBarItem">
        <Bars3Icon className="TopBarItemIcon" />
      </div>
      <div className="TopBarItem">
        Untitled
      </div>
      <div className="TopBarItem">
        <ShareIcon className="TopBarItemIcon" />
      </div>
    </div>
  );
};


export default TopBar;
