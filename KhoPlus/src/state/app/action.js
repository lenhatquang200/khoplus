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

export function updateItemProduct(data) {
    return {
        type: types.UPDATE_ITEM_PRODUCT,
        payload: {
            body: data,
        },
    };
}

export function updateItemManuFact(data) {
    return {
        type: types.UPDATE_ITEM_MANU_FACT,
        payload: {
            body: data,
        },
    };
}

export function updateGroupManuFact(data) {
    return {
        type: types.UPDATE_GROUP_MANU_FACT,
        payload: {
            body: data,
        },
    };
}

export function updateGroupProduct(data) {
    return {
        type: types.UPDATE_GROUP_PRODUCT,
        payload: {
            body: data,
        },
    };
}

export function updateTypeProduct(data) {
    return {
        type: types.UPDATE_TYPE_PRODUCT,
        payload: {
            body: data,
        },
    };
}

export function updateUnitProduct(data) {
    return {
        type: types.UPDATE_UNIT_PRODUCT,
        payload: {
            body: data,
        },
    };
}

