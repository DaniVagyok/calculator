const express = require('express');
const router = express.Router();
var fs = require('fs');

router.post('/write', function (req, res) {
  let valueToWrite = req.body.number;
  fs.writeFile('number.txt', valueToWrite, function (err) {
    if (err) {
      res.status(400).send('Error');
    }
    else {
      res.send('Saved: ' + valueToWrite);
    }
  });
})

router.get('/read', function (req, res) {
  fs.readFile('number.txt', (err, data) => {
    if (err) {
      res.status(400).send('Error');
    }
    else {
      res.send(data.toString());
    }
  });
})

module.exports = router