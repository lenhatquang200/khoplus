import Configs from "../config";
import KhoPlusApi from "./khoplusApi";

const uri = `https://${Configs.apiHost}/api`;

export async function getListProduct() {
  const result = await KhoPlusApi.CallApi(`${uri}/products`);
  return result;
}
