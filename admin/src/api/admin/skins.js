import { admin_request } from "../index";

export const getSkinList = () => {
  return admin_request.get("skins");
};

export const createNewSkin = (params) => {
  return admin_request.post("skins", params);
};

export const updateSkin = (...params) => {
  return admin_request.put(`skins/${params[0]}`, params[1]);
};

export const getSkinIdInfo = (params) => {
  return admin_request.get(`skins/${params}`);
};

export const deleteSkinId = (params) => {
  return admin_request.post(`skins/${params}`);
};
