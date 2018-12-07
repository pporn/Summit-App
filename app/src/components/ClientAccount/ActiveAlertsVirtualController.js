function getActiveAlerts(callback) {
    const api = 'https://us-central1-summit-app-6f288.cloudfunctions.net/getActiveAlerts'

    fetch(api)
        .then((res) => {
            if(res.status === 200) {
                res.json().then((payload) => {
                    callback(true, payload);
                });
            } else {
                callback(false, {error: 'cannot get active alerts'});
            }
        }).catch((error) => {
            callback(false, {error: error});
        });
}

export default getActiveAlerts;
