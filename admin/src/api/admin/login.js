import { bashURL } from "../index";

export const getAdminList = (params) => {
  return bashURL.post("/login", params);
};
