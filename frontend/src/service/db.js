import * as api from '../api/api';

/**
 * ITEM APIS
 */
export const createNewItem = async ({ categoryId, itemId, itemName }) => {
  await api.createNewItemApi({ categoryId, itemId, itemName });
  return;
}

export const getItemsInCategory = async ({ categoryId }) => {
  const response = await api.getItemsInCategoryApi({ categoryId });
  return response;
}

export const deleteItem = async ({categoryId, itemId }) => {
  await api.deleteItemApi({categoryId, itemId });
}

export const updateCount = async ({ categoryId, itemId, count }) => {
  await api.updateCountApi({ categoryId, itemId, count });
}

/**
 * CATEGORY APIS
 */
// new one
export const createNewCategory = async ({ categoryName, categoryId, userId }) => {
  await api.createNewCategoryApi({ categoryName, categoryId, userId });
}

export const getAllCategoryAndItems = async ({ userId }) => {
  const response = await api.getAllCategoryAndItemsApi({ userId });
  delete response.users;
  return response;
}

export const deleteCategory = async ({ categoryId }) => {
  await api.deleteCategoryApi({ categoryId });
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
