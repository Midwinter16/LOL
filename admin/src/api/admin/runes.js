import { admin_request } from "../index";

export const getRuneList = () => {
  return admin_request.get("runes");
};

export const createNewList = (params) => {
  return admin_request.post("runes", params);
};

export const updateList = (...params) => {
  return admin_request.put(`runes/${params[0]}`, params[1]);
};

export const getListIdInfo = (params) => {
  return admin_request.get(`runes/${params}`);
};

export const deleteListId = (params) => {
  return admin_request.post(`runes/${params}`);
};
