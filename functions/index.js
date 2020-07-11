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

app.use(cors({ origin: true }));
app.use(express.json());

app.get('/hello-world', (req, res) => {
  return res.status(200).send('hello world');
})

app.post('/api/create', (req, res) => {
  (async () => {
    try {
      console.log('req');
      await db.collection('items')
        .doc(`/${req.body.id}/`)
        .create({
          item: req.body.item
        });
        return res.status(200).send('Ok');
    } catch(error) {
      console.error(error);
      return res.status(500).send(error);
    }
  })();
})

app.post('/api/category/create', (req, res) => {
  (async () => {
    try {
      console.log(req.body.name);
      await db.collection(req.body.name).doc().create({ random: true });
      return res.status(200).send('ok')
    } catch(error) {
      console.error(error);
      return res.status(500).send(error);
    }
  })();
});

app.put('/api/item/update', (req, res) => {
  (async () => {
    try {
      console.log('check')
      console.log(req.body.id)
      const itemRef = db.collection('default').doc(req.body.id)
      const value = req.body.type === 'inc' ? 1 : -1
      itemRef.update({ count: admin.firestore.FieldValue.increment(value)})
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
      await db.collection('default').doc().create({
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

exports.app = functions.https.onRequest(app);