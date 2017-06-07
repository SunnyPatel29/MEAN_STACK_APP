var config = require('config.json');
var express = require('express');
var router = express.Router();
var multer = require('multer');
var fileService = require('services/file.service');

var storage = multer.diskStorage({ //multers disk storage settings
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        var datetimestamp = Date.now();
        cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1]);
    }
});

var upload = multer({ //multer settings
    storage: storage
}).single('file');

// routes
router.post('/upload', uploadfile);
router.get('/all/:_id', getAll);
router.delete('/:_id', _delete);

module.exports = router;

function uploadfile(req, res) {
    var userid = req.query.userid;
    upload(req, res, function (err) {
        if (err) {
            res.json({ error_code: 1, err_desc: err });
            return;
        }
        var file = { filename: req.file.filename, originalname:  req.file.originalname, size: req.file.size, type: req.file.mimetype, userid: userid }
        fileService.create(file)
            .then(function () {
                res.sendStatus(200);
            })
            .catch(function (err) {
                res.status(400).send(err);
            });
    });
}

function getAll(req, res) {
    console.log('call')
    fileService.getAll(req.params._id)
        .then(function (files) {
            res.send(files);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function _delete(req, res) {
    fileService.delete(req.params._id)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}