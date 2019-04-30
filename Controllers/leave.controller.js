const db = require('../Model/db.js');
const mysql = require('mysql');

function createLeaveRequest(req, res) {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();

    date = yyyy + '-' + mm + '-' + dd;
    let leaveData = [
        req.body.leaveDays,
        date,
        req.body.typeOfLeave,
        req.body.amount,
        req.body.employeeId
    ];
    let query = "insert into employeeLeave (leaveDays,dateRequested,typeOfLeave,amount,employeeId) values (?,?,?,?,?)";

    db.query(query, leaveData, (err, data) => {

        if (err) {
            console.log(err);
            res.sendStatus(500);
        } else {
            console.log("successful request");
            res.sendStatus(200);
        }
    });
}

function readLeaveRequests(req, res) {

    let query = 'select * from employeeLeave order by leaveId desc';

    db.query(query, (err, data) => {

        if (err) {
            console.log(err);
            res.sendStatus(500);
        } else {
            res.json(data);
        }
    });
}

function DeleteRequest(req, res) {

    let query = 'delete from employeeLeave where leaveId=' + req.params.id;

    db.query(query, (err) => {
        if (err) {
            console.log(err);
            res.sendStatus(500);
        } else {
            res.sendStatus(200);
        }
    });
}

function changeLeaveStatus(req, res) {

    let query = 'update employeeLeave set status= "' + req.params.status + '" where leaveId=' + req.params.id;

    db.query(query, (err) => {
        if (err) {
            console.log(err);
            res.sendStatus(500);
        } else {
            res.sendStatus(200);
        }
    });
}

function populate(req, res) {

    let month = req.params.month;
    let year = req.params.year;


    query = 'select d.fullname ,l.typeOfLeave, l.dateRequested ,l.leaveDates ,l.amount ,l.status from employeeDetails d inner join employeeLeave l on d.employeeId=l.employeeId where dateRequested like "' + year + '-' + month + '%' + '"';

    db.query(query, (err, data) => {

        if (err) {
            console.log(err);
            res.sendStatus(500);
        } else {
            console.log(data);
            res.json(data);
        }
    });
}

module.exports = {
    createLeaveRequest, // only employee
    readLeaveRequests, //only admin
    changeLeaveStatus, //only admin
    populate
    // DeleteRequest       //only employee
}