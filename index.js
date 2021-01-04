const firebase = require('firebase')
const firebaseConfig = {
    apiKey: "AIzaSyDO2p8QgNYkieFnGDuKbHNBuTc_prdohEo",
    authDomain: "second-life-project.firebaseapp.com",
    projectId: "second-life-project",
    storageBucket: "second-life-project.appspot.com",
    messagingSenderId: "999648828019",
    appId: "1:999648828019:web:def63fdb47334ba47aa806",
    measurementId: "G-FPQX92MQR5"
};
const send = require('gmail-send')({
    user: 'dimitripezaris@gmail.com',
    pass: 'DimitriP2004',
    to:   'dimitripezaris@gmail.com',
    subject: 'testing this stupid thing on heroku',
});
firebase.initializeApp(firebaseConfig)
let emailText = 'This weeks applications: '
const db = firebase.firestore();

const getDocs = () => {
    let docs = [];
    return Promise.resolve(true)
        .then(() => db.collection("applications").get())
        .then((snapShot) => {snapShot.forEach((doc) => {docs.push(doc.data())})})
        .then(() => docs);
}

getDocs().then((docs) => {
    docs.forEach(doc => {
        emailText =`${emailText} \n ${doc.name}: \n     Email: ${doc.email}\n      Address: ${doc.address}\n      Reason for Applying: ${doc.reason}`
    })
    send({
        text:    emailText,  
        }, (error, result, fullResult) => {
            if (error) console.error(error);
            console.log(result);
    })
})