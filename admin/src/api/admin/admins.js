import { admin_request } from "../index";

export const getAdminList = () => {
  return admin_request.get("admins");
};

export const createNewList = (params) => {
  return admin_request.post("admins", params);
};

export const updateList = (...params) => {
  return admin_request.put(`admins/${params[0]}`, params[1]);
};

export const getListIdInfo = (params) => {
  return admin_request.get(`admins/${params}`);
};

export const deleteListId = (params) => {
  return admin_request.post(`admins/${params}`);
};
