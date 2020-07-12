import * as api from '../api/api';
import { v4 as uuidv4 } from 'uuid';
import { async } from 'rxjs';

export const getAllItems = async () => {
  const getAllItemsApi = await api.getAllItemsApi();
  return getAllItemsApi;
}

export const createNewItem = async ({ name }) => {
  const id = uuidv4();
  await api.createNewItemApi({ name, id });
  return;
}

export const deleteItem = async ({ id }) => {
  await api.deleteItemApi({ id });
}

export const updateCount = async ({ id, type }) => {
  const response = await api.updateCountApi({ id, type });
  return response;
}
