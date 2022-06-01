import { admin_request } from "../index";

export const getClubList = () => {
  return admin_request.get("clubs");
};

export const createNewClub = (params) => {
  return admin_request.post("clubs", params);
};

export const updateClub = (...params) => {
  return admin_request.put(`clubs/${params[0]}`, params[1]);
};

export const getClubIdInfo = (params) => {
  return admin_request.get(`clubs/${params}`);
};

export const deleteClubId = (params) => {
  return admin_request.post(`clubs/${params}`);
};
