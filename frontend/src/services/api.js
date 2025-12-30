import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api";

export const fetchArticles = async () => {
  const response = await axios.get(`${API_BASE_URL}/articles`);
  return response.data;
};
