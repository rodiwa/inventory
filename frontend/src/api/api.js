/**
 * All APIs come here.
 * Append 'Api' to each function, Eg, getItemsApi, getCategoryApi, etc
 */

import * as apiUrl from './apiUrl';

const {
  createNewItemApiUrl, deleteItemApiUrl, updateCountApiUrl,
  createNewCategoryApiUrl, getAllCategoryAndItemsApiUrl, getItemsInCategoryApiUrl,
  createNewUserApiUrl, isExistingUserApiUrl, deleteUserApiUrl
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


// this is new one
export const createNewItemApi = ({ categoryId, itemId, itemName }) => {
  return (async () => {
    try {
      const response = await fetch(createNewItemApiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ categoryId, itemId, itemName }),
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

// this is new one
export const getItemsInCategoryApi = ({ categoryId }) => {
  return (async () => {
    try {
      const response = await fetch(`${getItemsInCategoryApiUrl}/${categoryId}`);
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

// to delete an item
// this is new one
export const deleteItemApi = ({categoryId, itemId }) => {
  return (async () => {
    try {
      const response = await fetch(deleteItemApiUrl, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({categoryId, itemId })
      })
      if (response.status !== 200) {
        setError(response.status);
      }
      return itemId;
    } catch(error) {
      console.error(error)
    }
  })();
}

// increment decrement count by 1
export const updateCountApi = ({ categoryId, itemId, count }) => {
  return (async () => {
    try {
      const response = await fetch(updateCountApiUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ categoryId, itemId, count })
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
// new one
export const createNewCategoryApi = ({ categoryName, categoryId, userId }) => {
  return (async () => {
    try {
      console.log('createNewCategory api');
      const response = await fetch(createNewCategoryApiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ categoryName, categoryId, userId })
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

/**
 * USER APIS
 */
export const createNewUser = ({ id }) => {
  return (async () => {
    try {
      await fetch(createNewUserApiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id, created: new Date().toString() })
      });
    } catch(error) {
      console.error(error);
    }
  })();
};

export const isUserExisting = ({ id }) => {
  return (async () => {
    try {
      const response = await fetch(`${isExistingUserApiUrl}/${id}`);
      const value = await response.text();
      return value;
    } catch(error) {
      console.error(error);
    }
  })();
};

export const deleteUser = ({ id }) => {
  return (async () => {
    try {
      await fetch(deleteUserApiUrl, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id })
      });
    } catch(error) {
      console.error(error);
    }
  })();
};

