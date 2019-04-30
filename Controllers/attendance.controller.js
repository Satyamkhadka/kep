const db = require('../Model/db.js');
const mysql = require('mysql');
const date=require('date-and-time');

var getEmployeesName = function (req, res) {
    let query = 'select d.employeeId, d.fullName from employeeDetails d';
    db.query(query, (err, data) => {
        if (err) {
            console.log(err);
            res.sendStatus(500);
        } else {
            console.log(query);
            res.json(data);
        }
    });
}

var searchThis = function(req,res){
    let year=req.params.year;
    let month=req.params.month;
    let dateStartString=year+'-'+month;
    let dateEndString=year+'-'+(month++);
    console.log(dateStartString);
    let queryDate=date.parse(dateStartString,'YYYY-MM');
    let query = 'select * from attendance where attendanceDate>= '+dateStartString+' and attendanceDate< '+dateEndString;
    console.log(query);
    
    ///res.json(queryDate);
}
module.exports={
                getEmployeesName,
                searchThis,
            };