import { bashURL } from "../index";

export const getRunesList = (params) => {
  return bashURL.get("/items/runes");
};

export const getEquipsList = (params) => {
  return bashURL.get("/items/equips");
};

export const getEquipinfo = (params) => {
  return bashURL.get(`/items/equips/${params}`);
};
