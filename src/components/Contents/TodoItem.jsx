import React from "react";
import classes from "./TodoItem.module.css";
import { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateTodo, reset } from "../../features/todo/todoSlice";

const TodoItem = ({ todos }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // -----------------

  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    if (todos.status === 1) {
      setClicked(true);
    } else {
      setClicked(false);
    }
  }, [todos.status]);

  const onClick = () => {
    setClicked(!clicked);
    const todoData = {
      _id: todos._id,
      status: clicked ? 0 : 1,
    };
    dispatch(updateTodo(todoData));
  };
  const textStyle = `${classes.text} ${clicked ? classes.strikethrough : ""}`;
  return (
    <div className={classes.todoItem__wrapper}>
      <input
        className={classes.input__itemTodo}
        type="checkbox"
        id={todos._id}
        onClick={onClick}
        checked={clicked ? true : false}
      />
      <label className={classes.label__todo} for={todos._id}>
        <span></span>
      </label>

      <h3 className={textStyle}>{todos.text}</h3>
    </div>
  );
};

export default TodoItem;
