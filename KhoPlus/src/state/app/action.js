import types from "./types";
import { keyStore } from "../../public";

export function authApp(data){
    return {
        type:types.AUTH_APP,
        payload:{
            body:data
        }
    }
}