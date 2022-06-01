import { bashURL } from "../index";

export const getNewsList = (params) => {
  return bashURL.get("/news/list");
};

export const getHeroesList = (params) => {
  return bashURL.get("/heroes/list");
};

export const getArticleDetail = (params) => {
  return bashURL.get(`/article/${params}`);
};

export const getHeroDetail = (params) => {
  return bashURL.get(`/hero/${params}`);
};
