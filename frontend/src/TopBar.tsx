import React from "react";

import {
  useStore,
  selectTitle,
} from "./store";

import {
  Bars3Icon,
  ShareIcon,
} from "@heroicons/react/24/outline";

import "./TopBar.css";


const TopBar = () => {
  const title = useStore(selectTitle);

  const onShareClicked = () => { /* nop */ };
  const onMenuClicked = () => { /* nop */ };
  const onTitleClicked = () => { /* nop */ };

  return (
    <div className="TopBar">
      <div className="TopBarItem" onClick={onMenuClicked}>
        <Bars3Icon className="TopBarItemIcon" />
      </div>
      <div className="TopBarItem" onClick={onTitleClicked}>
        { title }
      </div>
      <div className="TopBarItem" onClick={onShareClicked}>
        <ShareIcon className="TopBarItemIcon" />
      </div>
    </div>
  );
};


export default TopBar;
