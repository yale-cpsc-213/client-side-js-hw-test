const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Serve "static" files out of the directory called "static"
app.use('/static', express.static('static'));

app.get('/', (request, response) => {
    response.sendFile(path.join(__dirname, 'templates/index.html'));
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`);
});
