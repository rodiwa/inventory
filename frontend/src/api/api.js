/**
 * All APIs come here.
 * Append 'Api' to each function, Eg, getItemsApi, getCategoryApi, etc
 */

import * as apiUrl from './apiUrl';

const { getAllItemsApiUrl, createNewItemApiUrl, deleteItemApiUrl, updateCountApiUrl } = apiUrl;

const setError = (errorCode) => {
  // TODO: add a notification here in future
  throw new Error(`HTTP error code ${errorCode}`);
}

// to list all items
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
      console.error(error);
    }
  })();
}

// to create/ add a new item 
export const createNewItemApi = ({ name, id }) => {

  return (async () => {
    try {
      const response = await fetch(createNewItemApiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, id }),
      });
      if (response.status !== 200) {
        setError(response.status);
      };
      return;
    } catch(error) {
      console.error(error);
    }
  })();
}

// to delete an item
export const deleteItemApi = ({ id }) => {
  return (async () => {
    try {
      const response = await fetch(deleteItemApiUrl, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id })
      })
      if (response.status !== 200) {
        setError(response.status);
      }
      return id;
    } catch(error) {
      console.error(error)
    }
  })();
}

// increment decrement count by 1
export const updateCountApi = ({ id, type }) => {
  return (async () => {
    try {
      const count = type === 'inc' ? 1 : -1;
      const response = await fetch(updateCountApiUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, count })
      });
      if (response.status !== 200) {
        setError(response.status);
      }
      return;
    } catch(error) {
      console.error(error)
    }
  })();
}
