import { queryBuilder } from '../Shared/Utils.js';

function getClients(setNewClients) {
    const api = 'https://us-central1-summit-app-6f288.cloudfunctions.net/getAllUserNames?';
    const query = queryBuilder(api).getUrl();

    try {
        fetch(query).then((res) => {
            // set clients if response is 200
            if(res.status === 200) {
                res.json().then((clients) => {
                    setNewClients(clients);

                    // return after set new clients
                    return;
                });
            }

            // if status is not 200 set clients to null
            setNewClients(null);
            return;
        });
    } catch(e) {
        setNewClients(null);
    }

    return null;
}

function checkIn(userId, callback) {
    const api = 'https://us-central1-summit-app-6f288.cloudfunctions.net/userCheckIn';
    const payload = {
        user_id: userId,
    };

    fetch(api, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    }).then((res) => {
        if(res.status === 200) {
            callback(true, {});
        } else if(res.status === 422) {
            res.json().then((message) => {
                callback(false, message);
            });
        }
    });
}

export { getClients, checkIn };
