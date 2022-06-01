import { admin_request } from "../index";

export const getPlayerList = () => {
  return admin_request.get("players");
};

export const createNewPlayer = (params) => {
  return admin_request.post("players", params);
};

export const updatePlayer = (...params) => {
  return admin_request.put(`players/${params[0]}`, params[1]);
};

export const getPlayerIdInfo = (params) => {
  return admin_request.get(`players/${params}`);
};

export const deletePlayerId = (params) => {
  return admin_request.post(`players/${params}`);
};
