import React from "react";
import classes from "./AddTodo.module.css";
import { FaPlus, FaCalendarAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { createTodo, reset } from "../../features/todo/todoSlice";
import Spinner from "../Layouts/Spinner";
let isInitial = true;

const AddTodo = () => {
  const [addToggle, setAddToggle] = useState(false);
  const [formData, setFormData] = useState({
    text: "",
  });
  const { text } = formData;

  const { isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.todo
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const addEventToggle = () => {
    setAddToggle(!addToggle);
  };
  const cancelEvent = () => {
    setAddToggle(!addToggle);
  };

  useEffect(() => {
    if (isError) {
      // toast.error(message);
      console.log(message);
    }

    if (isInitial == true) {
      isInitial = false;
      dispatch(reset());
    }
  }, [text, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const todoData = {
      text,
    };
    dispatch(createTodo(todoData));
    setFormData({ text: "" });
  };

  return (
    <>
      {addToggle ? (
        <form onSubmit={onSubmit}>
          <div className={`${classes.todoItem__wrapper_add}`}>
            <div>
              <input
                type="text"
                placeholder="Add new task"
                name="text"
                onChange={onChange}
                value={text}
              />
            </div>
            <div className={classes.date_input_wrapper}>
              <span className={classes.datepicker_toggle}>
                <span className={classes.datepicker_toggle_button}></span>
                <input type="date" className={classes.datepicker_input} />
                <FaCalendarAlt />
                <p>Due Date</p>
              </span>
              <div>
                <button className={classes.btn_cancel} onClick={cancelEvent}>
                  Cancel
                </button>
                <button className={classes.btn_submit}>Add</button>
              </div>
            </div>
          </div>
        </form>
      ) : (
        <div className={classes.todoItem__wrapper} onClick={addEventToggle}>
          <div>
            <FaPlus />
          </div>
          <h3>Create new task</h3>
        </div>
      )}
    </>
  );
};

export default AddTodo;
