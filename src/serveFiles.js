const fs = require('fs');
const path = require('path');
const mime = require('mime-types');

const readPublicFiles = (file, fileReader, cb) => {
  fileReader(`./${file}`, (err, data) => {
    cb(err, data);
  });
};

const serveFile = (req, res) => {
  const { reqEndPoint: filepath } = req;

  readPublicFiles(filepath, fs.readFile, (err, data) => {
    if (err) {
      res.status(404).send('File not found');
      return;
    }

    const contentType = mime.contentType(path.extname(filepath));

    if (contentType) {
      res.setHeader('Content-Type', contentType);
    }

    res.file(data);
  });
};

module.exports = { serveFile, readPublicFiles };
