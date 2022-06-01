import { admin_request } from "../index";

export const getMatchList = () => {
  return admin_request.get("matches");
};

export const createNewMatch = (params) => {
  return admin_request.post("matches", params);
};

export const updateMatch = (...params) => {
  return admin_request.put(`matches/${params[0]}`, params[1]);
};

export const getMatchIdInfo = (params) => {
  return admin_request.get(`matches/${params}`);
};

export const deleteMatchId = (params) => {
  return admin_request.post(`matches/${params}`);
};
