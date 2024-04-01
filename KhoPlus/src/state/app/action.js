import types from "./types";
import { keyStore } from "../../public";

export function authApp(data) {
  return {
    type: types.AUTH_APP,
    payload: {
      body: data,
    },
  };
}
export function getColleague(data) {
  return {
    type: types.COLLUAGUE,
    payload: {
      body: data,
    },
    keyStore: keyStore.colleague,
  };
}
