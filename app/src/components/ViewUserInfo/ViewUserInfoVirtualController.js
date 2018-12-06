import { queryBuilder } from '../Shared/Utils.js';

function getUserInfoHelper(id, callback) {
    const api = 'https://us-central1-summit-app-6f288.cloudfunctions.net/getUserInfo?';

    const url = queryBuilder(api).param('user_id').val(id).getUrl();


    fetch(url).then((res) => {
        if(res.status === 200) {
            res.json().then((json) => {
                callback(true, json);
            });
        }
    }).catch((error) => {
        callback(false, { error: "Backend Error" });
    });
}

function getUserInfo(payload, callback){
    // Paramters
    const first_name = payload.firstName;
    const last_name = payload.lastName;
    const date_of_birth = payload.dob;

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
                    getUserInfoHelper(id, callback);
                });
                //payload.authenticated = true;
            } else {
                // call back when db failed
                callback(false, { error: "Given user does not exist" });
            }
        }).catch(error => {
            callback(false, { error: "Given user does not exist" });
        });
    } catch (e) {
        callback({ error: "QueryFail" });
    }
}

export default getUserInfo;
