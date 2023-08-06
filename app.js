const express = require('express');
const app = express();
const port = 3000;
const path = require('path')
const {spawn} = require('child_process');
app.use('/static', express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('/devices', (req, res) => {
  
})


app.listen(port, () => console.log(`Example app listening on port ${port}!`));