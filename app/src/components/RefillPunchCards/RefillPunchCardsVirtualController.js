import { queryBuilder } from '../Shared/Utils.js';

function refillPunchCardsHelper(id, refillAmount, callback) {
    const api = 'https://us-central1-summit-app-6f288.cloudfunctions.net/refillPunchCards';

    const payload = {
        user_id: id,
        refill_amount: refillAmount,
    };

    fetch(api, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    }).then((res) => {
        if(res.status === 200) {
            callback(true, {error: undefined});
        }
    });
}

function refillPunchCards(payload, callback){
    // Paramters
    const first_name = payload.firstName;
    const last_name = payload.lastName;
    const date_of_birth = payload.dob;
    const refill_amount = payload.refillAmount;

    const apiGetUserId = 'https://us-central1-summit-app-6f288.cloudfunctions.net/getUserId?';
    const query = queryBuilder(apiGetUserId)
                    .param('first_name').val(first_name)
                    .param('last_name').val(last_name)
                    .param('dob').val(date_of_birth)
                    .getUrl();

    // query
    try {
        fetch(query).then(res => {
            // return true upon successful call
            if(res.status === 200) {
                res.json().then(({ id }) => {
                    refillPunchCardsHelper(id, refill_amount, callback);
                });
                //payload.authenticated = true;
            } else {
                // call back when db failed
                callback(false, { error: "Fail to get user id" });
            }
        }).catch(error => {
            callback(false, { error: "DBFail" });
        });
    } catch (e) {
        callback({error: "QueryFail"});
    }
}

export default refillPunchCards;
