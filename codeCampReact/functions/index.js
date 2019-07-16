const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
const app = express();

admin.initializeApp();
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest((request, response) => {
 response.send("Hello from Firebase!");
});

exports.getScreams = functions.https.onRequest((request, response) => {
    admin.firestore().collection('screams').get()
    .then( data => {
        let screams = [];
        data.forEach(doc => {
            screams.push(doc.data());
        })
        return response.json(screams);
    })
    .catch(error => console.error(error))
   });

exports.createScream = functions.https.onRequest((request, response) => {

    const newScream = {
        body: request.body.body,
        userHandle: request.body.userHandle,
        createdAt: admin.firestore.Timestamp.fromDate(new Date())
    };

    admin.firestore()
    .collection('screams')
    .add(newScream)
    .then(doc => {
        response.json({ message: `document ${doc.id} created successfully ` });
    })
    .catch(err => {
        response.json({ message: 'something whent wrong'}).status(500);
        console.log(err);
    });

});
