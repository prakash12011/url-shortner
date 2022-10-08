const express = require('express');
const fs = require('fs')

const app = express(); 
const destinationFile = `${__dirname}/db.json`

app.use(express.json());

app.get('/url', async (req, res) => {
  try {
    fs.readFile(destinationFile, "utf-8", (err, data) => {
      const newData = (data == '') ? {} : JSON.parse(data)
      return res.status(200).json(newData);
    });
  } catch ({ response }) {
    return res.sendStatus(response.status);
  }
});

app.post('/setUrl', async (req, res) => {
  try {
    const { url, key } = req.body;
    fs.readFile(destinationFile, "utf-8", (err, data) => {
      const newData = (data == '') ? {} : JSON.parse(data)
      newData[key] = url

      fs.writeFile(destinationFile, JSON.stringify(newData), (err) => {
        if (err) console.log(err);
        return res.status(200).json(key);
      });      
    });
  } catch (e) {
    res.send('null')
  }
});

app.get('/getUrl/:shortUrl', async (req, res) => {
  const shortUrl = req.params.shortUrl
  try {
    fs.readFile(destinationFile, "utf-8", (err, data) => {
      const newData = (data == '') ? {} : JSON.parse(data)
      return res.status(200).json({ url: newData[shortUrl] })
    });
  } catch ({ response }) {
    return res.sendStatus(response.status);
  }
});

module.exports = app
