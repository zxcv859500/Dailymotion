const dm = require('dailymotion-sdk');

const dmApiKey = '8d05b3d96130d282210e';
const dmSecretKey = '9ff5546026c1c915d611cb4493e09f80dc63a850';

function client (id, password, filepath, metadata) {
    const client = dm.client(dmApiKey, dmSecretKey, ['manage_vidoes']);
    client.setCredentials('password', {
        username: id,
        password: password
    });
    client.createToken(() =>{});
    client.upload(filepath, metadata);
}

export default client;