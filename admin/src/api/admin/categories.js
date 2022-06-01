import { admin_request } from "../index";

export const getCategoryList = () => {
  return admin_request.get("categories");
};

export const createNewList = (params) => {
  return admin_request.post("categories", params);
};

export const updateList = (...params) => {
  return admin_request.put(`categories/${params[0]}`, params[1]);
};

export const getListIdInfo = (params) => {
  return admin_request.get(`categories/${params}`);
};

export const getParentsInfo = () => {
  return admin_request.get(`categories`);
};

export const deleteListId = (params) => {
  return admin_request.post(`categories/${params}`);
};
