const DEV = 'DEV';
const PROD = 'PROD';
const ENV = DEV; // can be DEV or PROD

const BASE_URL = {
  DEV: 'http://localhost:5000/inventory-4fc79/us-central1/app',
  PROD: 'https://us-central1-inventory-4fc79.cloudfunctions.net/app'
};

// TODO: setup properly
const getBaseUrl = (env = ENV) => {
  return ENV === BASE_URL[env.toUpperCase()];
};
const baseUrl = getBaseUrl();

// TODO: setup url to give only url or full url
export const getAllItemsApiUrl = '/api/item/all'; // TODO: will be reoved
export const createNewItemApiUrl = '/api/item/create';
export const deleteItemApiUrl = '/api/item/delete';
export const updateCountApiUrl = '/api/item/updateCount';

// export const createNewCategoryApiUrl = '/api/category/updateCount';
export const getAllCategoryAndItemsApiUrl = '/api/category/all';
