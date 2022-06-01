import { admin_request } from "../index";

export const getArticleList = () => {
  return admin_request.get("articles");
};

export const createNewList = (params) => {
  return admin_request.post("articles", params);
};

export const updateList = (...params) => {
  return admin_request.put(`articles/${params[0]}`, params[1]);
};

export const getListIdInfo = (params) => {
  return admin_request.get(`articles/${params}`);
};

export const getParentsInfo = () => {
  return admin_request.get(`articles`);
};

export const deleteListId = (params) => {
  return admin_request.post(`articles/${params}`);
};
