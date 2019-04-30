const db = require('../Model/db.js');
const mysql = require('mysql');

function createNotice(req, res) {

    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();

    date = yyyy + '-' + mm + '-' + dd;

    let noticeData = [
        req.body.heading,
        date,
        req.body.description
    ]
    let query = 'insert into notice (heading,date,description) values (?,?,?)';

    db.query(query, noticeData, (err, data) => {

        if (err) {
            console.log(err);
            res.sendStatus(500);
        } else {
            console.log("successful entry");
            res.sendStatus(200);
        }
    });
}

function readNotice(req, res) {

    let query = 'select * from notice';

    db.query(query, (err, data) => {

        if (err) {
            console.log(err);
            res.sendStatus(500);
        } else {
            res.json(data);
        }
    });
}

function deleteNotice(req, res) {

    let query = 'delete from notice where noticeId=' + req.params.id;

    db.query(query, (err) => {
        if (err) {
            console.log(err);
            res.sendStatus(500);
        }
        else{
            res.sendStatus(200);
        }
    });
}

module.exports = {
    createNotice,
    readNotice,
    deleteNotice
}