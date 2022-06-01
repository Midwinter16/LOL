import { admin_request } from "../index";

export const getHeroList = () => {
  return admin_request.get("heroes");
};

export const createNewHero = (params) => {
  return admin_request.post("heroes", params);
};

export const updateHero = (...params) => {
  return admin_request.put(`heroes/${params[0]}`, params[1]);
};

export const getHeroIdInfo = (params) => {
  return admin_request.get(`heroes/${params}`);
};

export const deleteHeroId = (params) => {
  return admin_request.post(`heroes/${params}`);
};
