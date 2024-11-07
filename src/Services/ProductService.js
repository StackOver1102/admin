import axios from "axios";
import { API } from "../utils/apiUrl";

export const getAll = async (access_token) => {
  const res = await axios.get(`${API}/products/getAll`, {}, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    }
  });
  return res.data;
};

export const createProduct = async (data) => {
  const res = await axios.post(`${API}/api/v1/product`, data);
  return res.data;
};

export const getDetilsProduct = async (id) => {
  const res = await axios.get(`${API}/products/${id}`);
  return res.data;
};

export const updateProduct = async (id, data) => {
  const res = await axios.patch(`${API}/products/${id}`, data);
  return res.data;
};

export const deleteProduct = async (id) => {
  const res = await axios.delete(`${API}/api/product/${id}`);
  return res.data;
}