import axios from "axios";

const API_URL = "https://productivity-app-tinn.herokuapp.com/api/pomos/";

// Create new todo
const createPomo = async (todoData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL + "today", todoData, config);
  return response.data;
};

// Get user goals
const getPomos = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL + "today", config);
  // console.log(response.data);
  return response.data;
};

const todoService = {
  createPomo,
  getPomos,
};

export default todoService;
