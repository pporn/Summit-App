function setMedicalQuestionnaire(payload, onFinish) {
    const api = 'https://us-central1-summit-app-6f288.cloudfunctions.net/setMedInfo';

    const { userId } = payload;
    // delete unused state props
    delete payload['isSubmitted'];
    delete payload['userId'];
    // post data
    const data = {};
    data['user_id'] = userId;
    data['val'] = payload;

    console.log(data);

    fetch(api, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    }).then((res) => {
        if(res.status === 200) {
            onFinish(true);
        } else {
            onFinish(false);
        }
    });
};

export default setMedicalQuestionnaire;
