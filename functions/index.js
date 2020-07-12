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

// to increment or decrement count
app.put('/api/item/updateCount', (req, res) => {
  (async () => {
    try {
      const itemRef = db.collection('default').doc(req.body.id)
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
      await db.collection('default').doc(req.body.id).delete();
      return res.status(200).send('ok');
    } catch(error) {
      console.error(error);
      return res.status(500).send(error);
    }
  })();
});

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

exports.app = functions.https.onRequest(app);
