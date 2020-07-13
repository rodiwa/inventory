/**
 * All APIs come here.
 * Append 'Api' to each function, Eg, getItemsApi, getCategoryApi, etc
 */

import * as apiUrl from './apiUrl';

const {
  createNewItemApiUrl, deleteItemApiUrl, updateCountApiUrl,
  createNewCategoryApiUrl, getAllCategoryAndItemsApiUrl
} = apiUrl;

const setError = (errorCode) => {
  // TODO: add a notification here in future
  throw new Error(`HTTP error code ${errorCode}`);
}

/**
 * ITEM APIS
 */
// TODO: will be removed
// to list all items
// export const getAllItemsApi = () => {
//   return (async () => {
//     try {
//       const response = await fetch(getAllItemsApiUrl);
//       if (response.status !== 200) {
//         setError(response.status);
//       };
//       const data = await response.json();
//       return data;
//     } catch(error) {
//       console.error(error);
//     }
//   })();
// }

// to create/ add a new item 
export const createNewItemApi = ({ name, id, category }) => {

  return (async () => {
    try {
      const response = await fetch(createNewItemApiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, id, category }),
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
export const deleteItemApi = ({ id, category }) => {
  return (async () => {
    try {
      const response = await fetch(deleteItemApiUrl, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, category })
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
export const updateCountApi = ({ id, type, category }) => {
  return (async () => {
    try {
      const count = type === 'inc' ? 1 : -1;
      const response = await fetch(updateCountApiUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, count, category })
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

/**
 * CATEGORY APIS
 */
export const createNewCategoryApi = ({ categoryName, itemName, itemId }) => {
  return (async () => {
    try {
      const response = await fetch(createNewCategoryApiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ categoryName, itemName, itemId })
      })
      if (response.status !== 200) {
        setError(response.status);
      }
      return;
    } catch(error) {
      console.error(error)
    }
  })();
}

export const getAllCategoryAndItemsApi = () => {
  return (async () => {
    try {
      const response = await fetch(getAllCategoryAndItemsApiUrl);
      if (response.status !== 200) {
        setError(response.status);
      }
      return response.json();
    } catch(error) {
      console.error(error);
    }
  })();
}

