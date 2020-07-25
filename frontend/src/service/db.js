import * as api from '../api/api';

/**
 * CATEGORY APIS
 */
// TODO: will be removed
// export const getAllItems = async () => {
//   const getAllItemsApi = await api.getAllItemsApi();
//   return getAllItemsApi;
// }

export const createNewItem = async ({ name, id, category }) => {
  await api.createNewItemApi({ name, id, category });
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
export const createNewCategory = async ({ categoryName, itemName, itemId, userId }) => {
  await api.createNewCategoryApi({ categoryName, itemName, itemId, userId });
}

export const getAllCategoryAndItems = async () => {
  const response = await api.getAllCategoryAndItemsApi();
  delete response.users;
  return response;
}

/**
 * USER APIS
 */
export const createNewUser = async ({ id }) => {
  const response = await api.createNewUser({ id });
  return response;
}

export const isUserExisting = async ({ id }) => {
  const response = await api.isUserExisting({ id });
  return response;
}

export const deleteUser = async ({ id }) => {
  const response = await api.deleteUser({ id });
  return response;
};
