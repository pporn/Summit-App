import { queryBuilder } from '../../Shared/Utils';

function deleteAlert(id, callback) {
    const api = 'https://us-central1-summit-app-6f288.cloudfunctions.net/deleteAlert?';
    const url = queryBuilder(api).param('alert_id').val(id).getUrl();

    fetch(url)
        .then((res) => {
            if(res.status === 200) {
                callback(true, {message: 'ok'});
            } else {
                callback(false, {error: 'cannot delete alert'});
            }
        }).catch((error) => {
            callback(false, {error: error});
        });
}

export default deleteAlert;
