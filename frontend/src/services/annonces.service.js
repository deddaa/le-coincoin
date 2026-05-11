import api from "./api.service";

export const getAllAnnonces = async (search = "") => {
  const res = await api.get(`/annonce?search=${search}`);
  return res.data;
};


export const getAnnonceById = async (id) => {
  const res = await api.get(`/annonce/${id}`);
  return res.data;
};


export const createAnnonce = async (data) => {
  const res = await api.post("/annonce/create", data);
  return res.data;
};

export const updateAnnonce = async (id, data) => {
  const res = await api.put(`/annonce/update/${id}`, data);
  return res.data;
};


export const deleteAnnonce = async (id) => {
  const res = await api.delete(`/annonce/delete/${id}`);
  return res.data;
};