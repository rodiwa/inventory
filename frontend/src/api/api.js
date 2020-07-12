/**
 * All APIs come here.
 * Append 'Api' to each function, Eg, getItemsApi, getCategoryApi, etc
 */

import * as apiUrl from './apiUrl';

const { getAllItemsApiUrl, createNewItemApiUrl } = apiUrl;

const setError = (errorCode) => {
  throw new Error(`HTTP error code ${errorCode}`);
}

export const getAllItemsApi = () => {
  return (async () => {
    try {
      const response = await fetch(getAllItemsApiUrl);
      if (response.status !== 200) {
        setError(response.status);
      };
      const data = await response.json();
      return data;
    } catch(error) {
      console.error(error)
    }
  })();
}

export const createNewItem = (body) => {
  console.log('api');
  // console.log(body.name);
  // console.log(body.id);
  console.log(body.name);
  console.log(body.id);
  console.log(createNewItemApiUrl);
  return (async () => {
    try {
      const response = await fetch(createNewItemApiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      if (response.status !== 200) {
        setError(response.status);
      };
      return;
    } catch(error) {
      console.error(error)
    }
  })();
}
