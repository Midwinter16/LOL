import { bashURL } from "../index";

export const getNewsList = (params) => {
  return bashURL.get("/news/list");
};
// 带分类
export const getHeroesList = (params) => {
  return bashURL.get("/heroes/list");
};
// 不带分类
export const getHeroList = (params) => {
  return bashURL.get("/hero/list");
};

export const getArticleDetail = (params) => {
  return bashURL.get(`/article/${params}`);
};

export const getHeroDetail = (params) => {
  return bashURL.get(`/hero/${params}`);
};

export const getAdsList = (params) => {
  return bashURL.get(`/ads/list`);
};
