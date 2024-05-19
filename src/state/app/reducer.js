import InitialState from "./initialState";
import types from "./types";

function createReducer(initialState, reducerMap) {
    return (state = initialState, action) => {
        const reducer = reducerMap[action.type];
        return reducer
            ? reducer(state, action.payload, action.param, action)
            : state;
    };
}

const initialState = new InitialState();

export default createReducer(initialState, {
    [types.AUTH_APP_SUCCESS]: (state, data) => {
        return state.set("authApp", data.body);
    },
    [types.COLLUAGUE_SUCCESS]: (state, data) => {
        return state.set("colleague", data.body);
    },
    [types.UPDATE_ITEM_PRODUCT_SUCCESS]: (state, data) => {
        return state.set("updateItemProduct", data.body);
    },
    [types.UPDATE_ITEM_MANU_FACT_SUCCESS]: (state, data) => {
        return state.set("updateItemManuFact", data.body);
    },
    [types.UPDATE_GROUP_MANU_FACT_SUCCESS]: (state, data) => {
        return state.set("updateGroupManuFact", data.body);
    },
});