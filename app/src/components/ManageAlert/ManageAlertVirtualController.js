function getAllAlerts(callback) {
    const api = 'https://us-central1-summit-app-6f288.cloudfunctions.net/getAllAlerts';

    fetch(api)
        .then((res) => {
            if(res.status === 200) {
                res.json().then((payload) => {
                    callback(true, payload);
                });
            } else {
                callback(false, { error: 'cannot get alerts' });
            }
        }).catch((error) => {
            callback(false, { error: error });
        });
}

export default getAllAlerts;
