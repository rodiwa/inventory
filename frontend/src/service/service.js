import * as api from '../api/api';
import { v4 as uuidv4 } from 'uuid';

/**
 * CATEGORY APIS
 */
// TODO: will be removed
// export const getAllItems = async () => {
//   const getAllItemsApi = await api.getAllItemsApi();
//   return getAllItemsApi;
// }

export const createNewItem = async ({ name }) => {
  const id = uuidv4();
  await api.createNewItemApi({ name, id });
  return;
}

export const deleteItem = async ({ id, category }) => {
  await api.deleteItemApi({ id, category });
}

export const updateCount = async ({ id, type, category }) => {
  const response = await api.updateCountApi({ id, type, category });
  return response;
}

/**
 * CATEGORY APIS
 */
// TODO: check if this category API is beeing used
// export const createNewCategory = async ({ categoryName, itemName, itemId }) => {
//   await api.createNewCategoryApi({ categoryName, itemName, itemId });
// }

export const getAllCategoryAndItems = async () => {
  const response = await api.getAllCategoryAndItemsApi();
  console.log(response);
  return response;
}
