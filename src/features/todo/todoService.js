import axios from "axios";

const API_URL = process.env.REACT_APP_BACKEND_URL + "api/todos/";

// Create new todo
const createTodo = async (todoData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, todoData, config);

  return response.data;
};

// Get user goals
const getTodos = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);
  // console.log(response.data);
  return response.data;
};

// Get user goals
const updateTodo = async (todoData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(API_URL + todoData._id, todoData, config);
  // console.log(response.data);
  return response.data;
};

const todoService = {
  createTodo,
  getTodos,
  updateTodo,
};

export default todoService;
