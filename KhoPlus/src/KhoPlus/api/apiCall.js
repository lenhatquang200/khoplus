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

export async function getGroupProduct(page, limit, name, search, code) {
  page || 1;
  limit || 10;
  name || "";
  search || false;
  code || "";
  const result = await KhoPlusApi.CallApi(
    `${uri}/product-groups?skip=${page}&limit=${limit}`
  );
  return result;
}
