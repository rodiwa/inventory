import * as api from '../api/api';
import { v4 as uuidv4 } from 'uuid';

export const getAllItems = async () => {
  const getAllItemsApi = await api.getAllItemsApi();
  return getAllItemsApi;
}

export const createNewItem = async ({ name }) => {
  const id = uuidv4();
  console.log('service - createNewItem')
  const body = {
    name,
    id: uuidv4()
  }
  await api.createNewItem({name, id});
  return;
}
