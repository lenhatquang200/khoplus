import Configs from "../config";
import KhoPlusApi from "./khoplusApi";

// https://api.khoplus.com/v1
const uri = `https://${Configs.apiHost}`;

export async function getListProduct(page) {
    page || 1;
    const result = await KhoPlusApi.CallApi(
        `${uri}/product/items?limit=10&page=${page}`
    );
    return result;
}

export async function deleteOneProductsGroup(id) {
    const method = "DELETE";
    const result = await KhoPlusApi.CallApi(`${uri}/product/items/${id}`, method);
    return result;
}

export async function updateOneProductsGroup(id, data) {
    const method = "PUT";
    const body = { ...data };
    const result = await KhoPlusApi.CallApi(
        `${uri}/product/items/${id}`,
        method,
        body
    );
    return result;
}

export async function createProducts(data) {
    const method = "POST";
    const body = { ...data };
    const result = await KhoPlusApi.CallApi(`${uri}/product/items`, method, body);
    return result;
}

export async function getGroupProduct(page) {
    page || 1;
    const result = await KhoPlusApi.CallApi(
        `${uri}/product/groups?limit=10&page=${page}`
    );
    return result;
}

export async function getDetailData(id) {
    const result = await KhoPlusApi.CallApi(`${uri}//product/items/${id}`);
    return result;
}

export async function getTypeProduct(page, limit, name, search, code) {
    // ?skip=${page}&limit=${limit}
    const result = await KhoPlusApi.CallApi(
        `${uri}/product/types?limit=10&page=${page}`
    );
    return result;
}

export async function getUnitProduct(page) {
    page || "";
    const result = await KhoPlusApi.CallApi(
        `${uri}/product/units?limit=10&page=${page}`
    );
    return result;
}

export async function getManufacturingList(page, limit, name, search, code) {
    page || "";
    const result = await KhoPlusApi.CallApi(
        `${uri}/manufacturing/items?limit=${limit}&page=${page}`
    );
    return result;
}

export async function getManufacturingGroup(page, limit, name, search, code) {
    page || "";
    limit || 10;
    name || "";
    search || false;
    code || "";
    const result = await KhoPlusApi.CallApi(`${uri}/manufacturing-groups`);
    return result;
}

export async function updateManufacturing(id, body) {
    const method = "PUT";
    const result = await KhoPlusApi.CallApi(
        `${uri}/manufacturings/${id}`,
        method,
        body
    );
    return result;
}

export async function cretaeManufacturing(body) {
    const method = "POST";
    const result = await KhoPlusApi.CallApi(
        `${uri}/manufacturings`,
        method,
        body
    );
    return result;
}

export async function deleteManufacturing(id) {
    const method = "DELETE";
    const result = await KhoPlusApi.CallApi(
        `${uri}/manufacturings/${id}`,
        method
    );
    return result;
}

export async function deleteManufact_Group(id) {
    const method = "DELETE";
    const result = await KhoPlusApi.CallApi(
        `${uri}/manufacturing-groups/${id}`,
        method
    );
    return result;
}

export async function updateManufact_Group(id, body) {
    const method = "PUT";
    const result = await KhoPlusApi.CallApi(
        `${uri}/manufacturing-groups/${id}`,
        method,
        body
    );
    return result;
}

export async function createManufact_Group(body) {
    const method = "POST";
    const result = await KhoPlusApi.CallApi(
        `${uri}/manufacturing-groups`,
        method,
        body
    );
    return result;
}

export async function updateProduct(id, body, type) {
    const method = "PUT";
    const result = await KhoPlusApi.CallApi(
        `${uri}/product/${type}/${id}`,
        method,
        body
    );
    return result;
}

export async function createProduct(body, type) {
    const method = "POST";
    const result = await KhoPlusApi.CallApi(
        `${uri}/product/${type}`,
        method,
        body
    );
    return result;
}

export async function deleteProduct(id, type) {
    const method = "DELETE";
    const result = await KhoPlusApi.CallApi(
        `${uri}/product/${type}/${id}`,
        method
    );
    return result;
}
