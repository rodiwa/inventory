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

/**
 * ITEMS
 */
export const updateCountApiUrl = '/api/item/updateCount';
export const createNewItemApiUrl = '/api/item/create';
export const deleteItemApiUrl = '/api/item/delete';
export const getAllItemsApiUrl = '/api/item/all';
export const getItemsInCategoryApiUrl = '/api/items/'; // '/api/items/:categoryId'

/**
 * CATEGORY
 */
export const createNewCategoryApiUrl = '/api/category/create';
export const getAllCategoryAndItemsApiUrl = '/api/category/all'; // '/api/category/all/:userId'
export const deleteCategoryApiUrl = '/api/category/delete';
// export const getAllItemsCategorised = '/api/category/all/sorted';

/**
 * USER
 */
export const createNewUserApiUrl = '/api/user/create';
export const isExistingUserApiUrl = '/api/user/find'; // '/api/user/find/:id'
export const deleteUserApiUrl = '/api/user/delete';
