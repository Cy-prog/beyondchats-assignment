import axios from "axios";

const API_BASE = "http://localhost:5000/api";

export async function fetchArticles() {
  const res = await axios.get(`${API_BASE}/articles`);
  return res.data;
}

export async function updateArticle(id, data) {
  const res = await axios.put(`${API_BASE}/articles/${id}`, data);
  return res.data;
}
