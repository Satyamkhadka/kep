const db = require('../Model/db.js');
const mysql = require('mysql');

function createReminder(req, res) {

    let reminderData = [
        req.body.heading,
        req.body.description,
        req.body.date,
        req.body.time,
        req.body.days,
    ]
    let query = 'insert into reminder (heading,description,rDate,rTime,days) values (?,?,?,?,?)';

    db.query(query, reminderData, (err, data) => {

        if (err) {
            console.log(err);
            res.sendStatus(500);
        } else {
            console.log("successful entry");
            res.sendStatus(200);
        }
    });
}

function readReminder(req,res){

    let query='select * from reminder';
    
    db.query(query,(err,data)=>{

        if(err){
            console.log(err);
            res.sendStatus(500);
        }
        else{
            res.json(data);
        }
    });
}

function deleteReminder(req,res){

    let query='delete from reminder where reminderId='+req.params.id;

    db.query(query,(err)=>{
        if(err){
            console.log(err);
            res.sendStatus(500);
        }
        else{
            res.sendStatus(200);
        }
    });
}
module.exports = {
                createReminder,
                readReminder,
                deleteReminder
}