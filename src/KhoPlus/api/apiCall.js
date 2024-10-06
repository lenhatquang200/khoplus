import KhoPlusApi from "./khoplusApi";

export async function getInfoCheckin(code, time) {
  const result = await KhoPlusApi.CallApi(
    `/staff/timekeeping/check-today/${code}?_=${time}`
  );
  return result;
}

export async function getReportTurnover(store_code, month,time) {
  const result = await KhoPlusApi.CallApi(
    `/report/turnover?store_code=${store_code}&month=${month}&_=${time}`
  );
  return result;
}

export async function getListTimeKeeping(code, month, time){
  const result = await KhoPlusApi.CallApi(
    `/staff/timekeeping/list/${code}?month=${month}&_=${time}`
  );
  return result;
}

export async function timekeepingToday(code, value, time){
  const result = await KhoPlusApi.CallApi(
    `/staff/timekeeping/rollup-today/${code}/${value}?_=${time}`
  );
  return result;
}

export async function uploadIdCard(file, code, type, ){
  const result = await KhoPlusApi.UploadFileApi( `/upload/idcard/${code}/${type}`, "POST", file);
  return result;
}



///////// ============
export async function getListProduct(page) {
  page || 1;
  const result = await KhoPlusApi.CallApi(
    `/product/items?limit=10&page=${page}`
  );
  return result;
}


export async function deleteOneProductsGroup(id) {
  const method = "DELETE";
  const result = await KhoPlusApi.CallApi(`/product/items/${id}`, method);
  return result;
}

export async function updateOneProductsGroup(id, data) {
  const method = "PUT";
  const body = { ...data };
  const result = await KhoPlusApi.CallApi(
    `/product/items/${id}`,
    method,
    body
  );
  return result;
}

export async function createProducts(data) {
  const method = "POST";
  const body = { ...data };
  const result = await KhoPlusApi.CallApi(`/product/items`, method, body);
  return result;
}

export async function getGroupProduct(page) {
  page || 1;
  const result = await KhoPlusApi.CallApi(
    `/product/groups?limit=10&page=${page}`
  );
  return result;
}

export async function getDetailData(id) {
  const result = await KhoPlusApi.CallApi(`/product/items/${id}`);
  return result;
}

export async function getTypeProduct(page, limit, name, search, code) {
  // ?skip=${page}&limit=${limit}
  const result = await KhoPlusApi.CallApi(
    `/product/types?limit=10&page=${page}`
  );
  return result;
}

export async function getUnitProduct(page) {
  page || "";
  const result = await KhoPlusApi.CallApi(
    `/product/units?limit=10&page=${page}`
  );
  return result;
}

export async function getManufacturingList(page, limit, name, search, code) {
  page || "";
  const result = await KhoPlusApi.CallApi(
    `/manufacturing/items?limit=${limit}&page=${page}`
  );
  return result;
}

export async function getManufacturingGroup(page, limit, name, search, code) {
  page || "";
  limit || 10;
  name || "";
  search || false;
  code || "";
  const result = await KhoPlusApi.CallApi(`/manufacturing/groups`);
  return result;
}

export async function updateManufacturing(id, body) {
  const method = "PUT";
  const result = await KhoPlusApi.CallApi(
    `/manufacturing/items/${id}`,
    method,
    body
  );
  return result;
}

export async function cretaeManufacturing(body) {
  const method = "POST";
  const result = await KhoPlusApi.CallApi(
    `/manufacturing/items`,
    method,
    body
  );
  return result;
}

export async function deleteManufacturing(id) {
  const method = "DELETE";
  const result = await KhoPlusApi.CallApi(
    `/manufacturing/items/${id}`,
    method
  );
  return result;
}

export async function deleteManufact_Group(id) {
  const method = "DELETE";
  const result = await KhoPlusApi.CallApi(
    `/manufacturing/groups/${id}`,
    method
  );
  return result;
}

export async function updateManufact_Group(id, body) {
  const method = "PUT";
  const result = await KhoPlusApi.CallApi(
    `/manufacturing/groups/${id}`,
    method,
    body
  );
  return result;
}

export async function createManufact_Group(body) {
  const method = "POST";
  const result = await KhoPlusApi.CallApi(
    `/manufacturing/groups`,
    method,
    body
  );
  return result;
}

export async function updateProduct(id, body, type) {
  const method = "PUT";
  const result = await KhoPlusApi.CallApi(
    `/product/${type}/${id}`,
    method,
    body
  );
  return result;
}

export async function createProduct(body, type) {
  const method = "POST";
  const result = await KhoPlusApi.CallApi(
    `/product/${type}`,
    method,
    body
  );
  return result;
}

export async function deleteProduct(id, type) {
  const method = "DELETE";
  const result = await KhoPlusApi.CallApi(
    `/product/${type}/${id}`,
    method
  );
  return result;
}

export async function getListCustomer(page) {
  page || 1;
  const result = await KhoPlusApi.CallApi(
    `/customer/items?limit=10&page=${page}`
  );
  return result;
}

export async function getListCustomerAddress(page) {
  page || 1;
  const result = await KhoPlusApi.CallApi(`/customer/addresss`);
  return result;
}
