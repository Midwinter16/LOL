import { admin_request } from "../index";

export const getEquipList = () => {
  return admin_request.get("equips");
};

export const createNewList = (params) => {
  return admin_request.post("equips", params);
};

export const updateList = (...params) => {
  return admin_request.put(`equips/${params[0]}`, params[1]);
};

export const getListIdInfo = (params) => {
  return admin_request.get(`equips/${params}`);
};

export const deleteListId = (params) => {
  return admin_request.post(`equips/${params}`);
};
