const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 6001;

app.use(bodyParser.json())
app.disable('x-powered-by');
app.use(cors({ origin: '*'}))

const getRoutes = require('./routes/read_JSON');
const postRoutes = require('./routes/write_JSON');

app.get('/', (req, res) => {
    res.send('Starley Baby Bingo server.')
})
// app.get('/readJSON', getRoutes.readJSON);
app.get('/readjson', (req,res) => {
    let json = fs.readFileSync('./helper_files/bingo_object.json');
    let data = JSON.parse(json);
    res.send(data)
})
app.post('/writejson', (req,res) => {
    console.log('REQ', req.body)
    let body = req.body;
    let newJSON = {
        "family": body
    };
    let data = JSON.stringify(newJSON, null, 2);
    fs.writeFileSync('./helper_files/bingo_object.json', data);
})


const listener = () => console.log(`Listening on port ${port}`);
app.listen(port, listener);


app.use((err, req, res, next) => {
    const status = err.status || 500;
    res.status(status).json({error: err});
})

app.use((req,res,next) => {
    res.status(404).json({error: { message: "Not found"}})
});
