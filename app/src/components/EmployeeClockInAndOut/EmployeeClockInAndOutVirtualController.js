import { queryBuilder } from '../Shared/Utils.js';
const firebase = require('firebase/app');
require('firebase/auth');

function init() {
    var config = {
        apiKey:"AIzaSyAPtPRECDUfTVZIB8D5vNX5woc18ZeTq_I",
        authDomain: "summit-app-6f288.firebaseapp.com",
        databaseURL: "https://summit-app-6f288.firebaseio.com",
        projectId: "summit-app-6f288",
        storageBucket: "summit-app-6f288.appspot.com",
        messagingSenderId: "587485967951",
   };

    firebase.initializeApp(config);
}

function authEmployee(payload, callback, onClockedIn) {
    // init only it is not inited
    if (!firebase.apps.length) {
        init();
    }

    // get email and password
    const { email, password } = payload;
    // data for callback
    const returnVal = {
        userId: undefined,
        authenticated: false,
        error: undefined,
    };

    firebase.auth().signInWithEmailAndPassword(email, password)
        .catch((error) => {
            returnVal.error = error;

        })
        .then((user) => {
            // return if any error occured
            if(returnVal.error) {
                callback(returnVal, onClockedIn);

                return;
            }

            // fetch current user
            user = firebase.auth().currentUser;

            if(user) {
                returnVal.userId = user.uid;
                returnVal.authenticated = true;

                firebase.auth().signOut();
            }

            callback(returnVal, onClockedIn);
        });
}

function onAuthed(res, callback) {
    if(res.error !== undefined) {
        callback(false, { error: res.error });

        return;
    }

    const url = 'https://us-central1-summit-app-6f288.cloudfunctions.net/getEmployeeClockInAndOut?';
    const api = queryBuilder(url).param('uid').val(res.userId).getUrl();

    fetch(api)
        .then((res) => {
            if(res.status === 200) {
                res.json().then((data) => {
                    callback(true, data);
                });
            } else {
                res.json().then((data) => {
                    console.log(data);
                    callback(false, { error: data.message });
                });
            }
        }).catch((error) => {
            callback(false, { error: error });
        });
}

function getClockInAndOut(payload, callback) {
    authEmployee(payload, onAuthed, callback);
}

export default getClockInAndOut;
