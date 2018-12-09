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

    const api = 'https://us-central1-summit-app-6f288.cloudfunctions.net/employeeClockIn';

    fetch(api, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ uid: res.userId }),
    }).then((res) => {
            if(res.status === 200) {
                callback(true, { message: 'ok' });
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

function clockIn(payload, callback) {
    authEmployee(payload, onAuthed, callback);
}

export default clockIn;
