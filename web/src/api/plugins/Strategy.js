import { bashURL } from "../index";

export const getNewsList = (params) => {
  return bashURL.get("/news/list");
};

export const getAllHeroes = (params) => {
  return bashURL.get("/heroes/allhero");
};

export const getAllArticle = (params) => {
  return bashURL.get("/article/list");
};
