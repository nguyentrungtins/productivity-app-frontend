import React from "react";
import Todo from "./Todo";
import Pomodoro from "./Pomodoro";
import classes from "./Content.module.css";

const Content = () => {
  return (
    <div className={classes.content__container}>
      <Todo />
      <Pomodoro />
    </div>
  );
};

export default Content;
