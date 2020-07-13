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

// sample only
app.get('/hello-world', (req, res) => {
  return res.status(200).send('hello world');
})

/** 
 * ITEM APIS
 */
// to increment or decrement count
app.put('/api/item/updateCount', (req, res) => {
  (async () => {
    try {
      const itemRef = db.collection(req.body.category).doc(req.body.id)
      itemRef.update({ count: admin.firestore.FieldValue.increment(req.body.count)})
      return res.status(200).send('ok');
    } catch(error) {
      console.error(error);
      return res.status(500).send(error);
    }
  })();
});

app.post('/api/item/create', (req, res) => {
  (async () => {
    try {
      await db.collection('default').doc(req.body.id).create({
        id: req.body.id,
        name: req.body.name,
        count: 1
      })
      return res.status(200).send('ok');
    } catch(error) {
      console.error(error);
      return res.status(500).send(error);
    }
  })();
});


app.delete('/api/item/delete', (req, res) => {
  (async () => {
    try {
      await db.collection(req.body.category).doc(req.body.id).delete();
      return res.status(200).send('ok');
    } catch(error) {
      console.error(error);
      return res.status(500).send(error);
    }
  })();
});

// TODO: will be removed?
app.get('/api/item/all', (req, res) => {
  (async () => {
    try {
      const itemsArr = []
      const itemRef = db.collection('default')
      await itemRef.get().then(snapshot => {
        const items = snapshot.docs;
        for (let item of items) {
          itemsArr.push(item.data());
        }
        return res.status(200).send(itemsArr);
      }).catch(error => {
        console.error(error);
        return res.status(500).send(error);
      })
    } catch(error) {
      console.error(error);
      return res.status(500).send(error);
    }
    return false;
  })();
});

/** 
 * CATEGORY APIS
 */
app.post('/api/category/create', (req, res) => {
  (async () => {
    try {
      const { categoryName, itemName, itemId } = req.body;
      await db.collection(categoryName).doc(itemId).create({
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
})

app.get('/api/category/all', (req, res) => {
  (async () => {
    try {
      let arrCollections = [];
      let arrItems = [];
      let allCategoryData = {};
      const allCollectionsRef = await db.listCollections();
      // get all collections first
      for (let collection of allCollectionsRef) {
        arrCollections.push(collection.id);
        allCategoryData[collection.id] = [];
      }
      // for each collection, get its items next
      for (let category of Object.keys(allCategoryData)) {
        // pass in a async reference, instead of having await in a loop
        // TODO: instead of await in loop, find better/parallel approach
        // eslint-disable-next-line no-await-in-loop
        const allItemsRef = await db.collection(category).get();
        const items = allItemsRef.docs;
        // TODO: avoid nested for-loops
        for (let item of items) {
          allCategoryData[category].push(item.data());
        }

      }
      return res.status(200).send(allCategoryData);
    } catch(error) {
      console.error(error);
      return res.status(500).send(error);
    }
  })();
})

exports.app = functions.https.onRequest(app);
