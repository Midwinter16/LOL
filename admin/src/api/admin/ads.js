import { admin_request } from "../index";

export const getAdsList = () => {
  return admin_request.get("ads");
};

export const createNewList = (params) => {
  return admin_request.post("ads", params);
};

export const updateList = (...params) => {
  return admin_request.put(`ads/${params[0]}`, params[1]);
};

export const getListIdInfo = (params) => {
  return admin_request.get(`ads/${params}`);
};

export const deleteListId = (params) => {
  return admin_request.post(`ads/${params}`);
};
