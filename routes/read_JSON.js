const fs = require('fs');

exports.readJSON = (req, res) => {
    console.log('read JSON route')
    fs.readFile('../helper_files/bingo_object.json', 'utf8', (err, data) => {
        if (err) {
            console.log(err)
            return
        }
        console.log(data);
        res.send(data);
    })
};