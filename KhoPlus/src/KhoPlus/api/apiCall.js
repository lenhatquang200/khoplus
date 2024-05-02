import Configs from "../config";
import KhoPlusApi from "./khoplusApi";

const uri = `https://${Configs.apiHost}/api`;

export async function getListProduct(page, limit, name, search, code) {
    page || 1;
    limit || 10;
    name || "";
    search || false;
    code || "";
    const result = await KhoPlusApi.CallApi(
        `${uri}/products?skip=${page}&limit=${limit}`
    );
    return result;
}

export async function deleteOneProductsGroup(id) {
    const method = "DELETE";
    const result = await KhoPlusApi.CallApi(`${uri}/products/${id}`, method);
    return result;
}

export async function updateOneProductsGroup(id, data) {
    const method = "PUT";
    const body = { ...data };
    const result = await KhoPlusApi.CallApi(
        `${uri}/products/${id}`,
        method,
        body
    );
    return result;
}

export async function createProducts(data) {
    const method = "POST";
    const body = { ...data };
    const result = await KhoPlusApi.CallApi(`${uri}/products`, method, body);
    return result;
}

export async function getGroupProduct(page, limit, name, search, code) {
    page || 1;
    limit || 10;
    name || "";
    search || false;
    code || "";
    // ?skip=${page}&limit=${limit}
    const result = await KhoPlusApi.CallApi(
        `${uri}/product-groups`
    );
    return result;
}

export async function getTypeProduct(page, limit, name, search, code) {
    page || "";
    limit || 10;
    name || "";
    search || false;
    code || "";
    // ?skip=${page}&limit=${limit}
    const result = await KhoPlusApi.CallApi(
        `${uri}/product-types`
    );
    return result;
}

export async function getUnitProduct(page, limit, name, search, code) {
    page || "";
    limit || 10;
    name || "";
    search || false;
    code || "";
    const result = await KhoPlusApi.CallApi(
        `${uri}/product-units?skip=${page}&limit=${limit}`
    );
    return result;
}

export async function getManufacturingList(page, limit, name, search, code) {
    page || "";
    limit || 10;
    name || "";
    search || false;
    code || "";
    const result = await KhoPlusApi.CallApi(
        `${uri}/manufacturings?skip=${page}&limit=${limit}`
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
    const result = await KhoPlusApi.CallApi(`${uri}/manufacturings/${id}`, method);
    return result;
}


export async function deleteManufact_Group(id) {
    const method = "DELETE";
    const result = await KhoPlusApi.CallApi(`${uri}/manufacturing-groups/${id}`, method);
    return result;
}

export async function updateManufact_Group(id, body) {
    const method = "PUT";
    const result = await KhoPlusApi.CallApi(`${uri}/manufacturing-groups/${id}`, method, body);
    return result;
}

export async function createManufact_Group(body) {
    const method = "POST";
    const result = await KhoPlusApi.CallApi(`${uri}/manufacturing-groups`, method, body);
    return result;
}


export async function updateProduct_Group(id, body) {
    const method = "PUT";
    const result = await KhoPlusApi.CallApi(`${uri}/product-groups/${id}`, method, body);
    return result;
}

export async function createProduct_Group(body) {
    const method = "POST";
    const result = await KhoPlusApi.CallApi(`${uri}/product-groups`, method, body);
    return result;
}

export async function deleteProduct_Group(id) {
    const method = "DELETE";
    const result = await KhoPlusApi.CallApi(`${uri}/product-groups/${id}`, method);
    return result;
}


