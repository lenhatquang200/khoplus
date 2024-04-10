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
