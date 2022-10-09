import React from "react";

import {
  Bars3Icon,
  ShareIcon,
} from "@heroicons/react/20/solid";

import "./TopBar.css";


const TopBar = () => {
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
