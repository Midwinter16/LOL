import { bashURL } from "../index";

export const getMatchList = (params) => {
  return bashURL.get("/matches/list");
};
