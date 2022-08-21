import React from "react";
import { useState, useRef } from "react";
import SideBar from "./SideBar";
import Content from "../Contents/Content";
import classes from "./Layout.module.css";
function Layout() {
  // const [isActive, setIsActive] = useState(false);

  return (
    <div className={classes.body}>
      <SideBar></SideBar>
      <Content></Content>
    </div>
  );
}

export default Layout;
