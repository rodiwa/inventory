const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express')
const cors = require('cors');
const app = express();

const serviceAccount = require('./permissions.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://inventory-4fc79.firebaseio.com'
})

const db = admin.firestore();

app.use(cors());
app.use(express.json());

/** 
 * ITEM APIS
 */
// to increment or decrement count
app.put('/api/item/updateCount', (req, res) => {
  (async () => {
    try {
      const { categoryId, itemId, count } = req.body;
      await db.collection('category').doc(categoryId).collection('items').doc(itemId)
        .update({count: admin.firestore.FieldValue.increment(count)});
      return res.status(200).send('ok');
    } catch(error) {
      console.error(error);
      return res.status(500).send(error);
    }
  })();
});

// create new item
app.post('/api/item/create', (req, res) => {
  (async () => {
    try {
      const { categoryId, itemId, itemName } = req.body;
      await db.collection('category').doc(categoryId).collection('items').doc(itemId).create({
        id: itemId,
        name: itemName,
        count: 1
      })
      return res.status(200).send('ok');
    } catch(error) {
      console.error(error);
      return res.status(500).send(error);
    }
  })();
});

// delete selected item
app.delete('/api/item/delete', (req, res) => {
  (async () => {
    try {
      const { categoryId, itemId } = req.body;
      await db.collection('category').doc(categoryId).collection('items').doc(itemId).delete();
      return res.status(200).send('ok');
    } catch(error) {
      console.error(error);
      return res.status(500).send(error);
    }
  })();
});

// get all items
app.get('/api/item/all', (req, res) => {
  (async () => {
    try {
      let result = [];
      const itemGroup = await db.collectionGroup('items').get();
      itemGroup.forEach(item => {
        result.push(item.data());
      });
      return res.status(200).send(result);
    } catch(error) {
      console.error(error);
      return res.status(500).send(error);
    }
  })();
});

// get items in given category
// TODO: we may not use this. this works best for a one time fetch, but to imlement
// realtime sync, its best to call this directly from actions (onSnaphot),
// and then update the ist accordingly. 
app.get('/api/items/:categoryId', (req, res) => {
  (async () => {
    try {
      let result = [];
      const itemGroup = await db.collection('category').doc(req.params.categoryId).collection('items').get();
      itemGroup.forEach(item => {
        result.push(item.data());
      });
      res.status(200).send(result);
    } catch(error) {
      console.error(error);
      return res.status(500).send(error);
    }
  })();
});

/** 
 * CATEGORY APIS
 */
// create new category
app.post('/api/category/create', (req, res) => {
  (async () => {
    try {
      const { categoryName, categoryId, userId } = req.body;
      await db.collection('category').doc(categoryId).create({
        id: categoryId,
        name: categoryName,
        users: [userId]
      })
      return res.status(200).send('ok');
    } catch(error) {
      console.error(error);
      return res.status(500).send(error);
    }
  })();
})

// get all category - old
// app.get('/api/category/all', (req, res) => {
//   (async () => {
//     try {
//       let arrCollections = [];
//       let arrItems = [];
//       let allCategoryData = {};
//       const allCollectionsRef = await db.listCollections();
//       // get all collections first
//       for (let collection of allCollectionsRef) {
//         arrCollections.push(collection.id);
//         allCategoryData[collection.id] = [];
//       }
//       // for each collection, get its items next
//       for (let category of Object.keys(allCategoryData)) {
//         // pass in a async reference, instead of having await in a loop
//         // TODO: instead of await in loop, find better/parallel approach
//         // eslint-disable-next-line no-await-in-loop
//         const allItemsRef = await db.collection(category).get();
//         const items = allItemsRef.docs;
//         // TODO: avoid nested for-loops
//         for (let item of items) {
//           allCategoryData[category].push(item.data());
//         }

//       }
//       return res.status(200).send(allCategoryData);
//     } catch(error) {
//       console.error(error);
//       return res.status(500).send(error);
//     }
//   })();
// })

// get all category
// TODO: 1st attempt; get category+ items in one shot
// TODO: else, get category, items separately but recursively
app.get('/api/category/all', (req, res) => {
  (async () => {
    try {
      let result = [];
      const categoryGroup = await db.collection('category').get();
      categoryGroup.forEach(category => {
        result.push(category.data());
      });
      return res.status(200).send(result);
    } catch(error) {
      console.error(error);
      return res.status(500).send(error);
    }
  })();
});

// get all items, soreted by category
// TODO: 2 ways to do this; get all categories, all items (separately and) parallely and mcombine them on client side
// TODO: or, simply get category, then its items recursively; could be more expensive
app.get('/api/category/all/sorted', (req, res) => {
  (async () => {
    try {
      let result = [];
      const categoryGroup = await db.collection('category').get();
      categoryGroup.forEach(async (category) => {
        let categoryData = category.data();
        categoryData.items = [];
        const itemsRef = await db.collection('category').doc(categoryData.id).collection('items').get();
        // TODO: fix this, adding this, return empty array, else works good
        // itemsRef.forEach(async item => {
        //   categoryData.items.push(await item.data());
        // });
        result.push(categoryData);
      });
      return res.status(200).send(result);
    } catch(error) {
      console.error(error);
      return res.status(500).send(error);
    }
  })();
});

// deletes given category (and its items) 
app.delete('/api/category/delete', (req, res) => {
  (async () => {
    try {
      const { categoryId } = req.body;
      const allItemsInCategory = await db.collection('category').doc(categoryId).collection('items').get();
      allItemsInCategory.forEach(async (snapshot) => {
        const { id } = snapshot.data();
        await db.collection('category').doc(categoryId).collection('items').doc(id).delete();
      });
      await db.collection('category').doc(categoryId).delete();
      return res.status(200).send(categoryId);
    } catch(error) {
      console.error(error);
      return res.status(500).send(error);
    }
  })();
})

/**
 * USER APIS
 */
// create new user
app.post('/api/user/create', (req, res) => {
  (async () => {
    try {
      await db.collection('users').doc(req.body.id).create({
        id: req.body.id,
        created: req.body.created
      })
      res.status(200).send('ok');
    } catch(error) {
      console.error(error);
      res.status(500).send(error);
    }
  })();
});

// is user existing
app.get('/api/user/find/:id', (req, res) => {
  (async () => {
    try {
      let isExisting = null;
      const response = await db.collection('users').where('id', '==', req.params.id);
      response.get().then(snaphot => {
        isExisting = snaphot.docs.length > 0 ? true : false;
        return res.status(200).send(isExisting);
      }).catch(err => {
        console.error(err);
      });
    } catch(error) {
      console.error(error);
      res.send(500).send(error);
    }
  })();
});

// deleteUser
app.delete('/api/user/delete', (req, res) => {
  (async () => {
    try {
      await db.collection('users').doc(req.body.id).delete();
      res.status(200).send('ok');
    } catch(error) {
      console.error(error);
      res.status(500).send(error);
    }   
  })();
});

exports.app = functions.https.onRequest(app);
