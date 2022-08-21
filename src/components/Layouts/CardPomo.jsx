import classes from "./CardPomo.module.css";
import { useState } from "react";
const CardPomo = ({ amount = 0, today = 0, isActive = false }) => {
  const [clickToActive, setClickToActive] = useState(false);

  const active = isActive ? classes.active : "";
  return (
    <>
      <div className={`${classes.card} ${active}`}>
        <div className={classes.header_card}>
          <h1>{amount}m</h1>
          <div className={classes.break}></div>
        </div>
        <div className={classes.card_bottom}>
          <h3>Today</h3>
          <h1>{today}</h1>
        </div>
      </div>
    </>
  );
};
export default CardPomo;
