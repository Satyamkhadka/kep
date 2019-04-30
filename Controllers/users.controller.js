const db = require('../Model/db.js');
const imageController = require('./image.controller.js');
const mysql = require('mysql');
const e = require('../Model/Employee');


//to get all user detils 
var getAllUsersForAdminDashboard = function (req, res) {
    let query = 'select d.employeeId,d.fullName,d.typeOfEmployee,p.department,d.officialEmail,p.joinDate,d.MobileNumber,p.endDate from ' +
        '(employeeDetails as d inner join employeeProfessionalDetails as p on d.employeeId = p.employeeId)';
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

//to delete a user

var deleteUser = function (req, res) {
    let query = ' delete from employeeDetails employeeId=' + req.params.employeeId;
    db.query(query, (err, data) => {
        if (err) {
            console.log(err);
            res.sendStatus(500);
        } else {
            console.log(query);
            res.sendStatus(202);
        }
    });
}

//db.query('set foreign_key_checks = 0');
var getDetailsForUpdate = function (req, res) {
    let query = 'select * from employeeDetails d inner join employeeAddressDetails a inner join employeeProfessionalDetails p inner join employeeEmergencyDetails e' +
        ' where d.employeeId=a.employeeId and a.employeeId=p.employeeId and p.employeeId=e.employeeId and d.employeeId=' +
        req.params.employeeId +
        ' group by d.employeeId';

    db.query(query, (err, data) => {
        if (err) {
            console.log(err);
            res.sendStatus(500);
        } else {
            console.log('successful');
            //console.log(query);
            res.json(data);
        }
    });

}


async function createUser(req, res) {
    await e.initializeData(req, res).catch(err=>{res.json({'error':'error in initializing data. or file format is wrong'});});
    await e.beginTransaction().catch(err=>{res.json({'error':'error in begenning sql transaction'});});
    await e.setEmployeeDetails(req, res).catch(err=>{res.json({'error':'error in setting employee Details'});});
    e.getRequest();
    await e.insertEmployeeDetails().catch(err=>{res.json({'error':'error in inserting employee Details'});});
    await e.getEmployeeId().catch(err=>{res.json({'error':'error in getting genetated employee ID'});});
    await e.insertTemporaryAddress().catch(err=>{res.json({'error':'error in inserting temporary data'});});
    await e.insertPermanentAddress().catch(err=>{res.json({'error':'error in insering permanent data '});});
    await e.insertProfessionalDetails().catch(err=>{res.json({'error':'error in inserting professional details'});});
    await e.insertEmergencyTable().catch(err=>{res.json({'error':'error in inserting emergency contact information'});});
    await e.insertCV().catch(err=>{res.json({'error':'error in inserting CV '});});
    await e.insertCitizenship().catch(err=>{res.json({'error':'error in inserting citizenship'});});
    await e.commitTransaction(req, res).catch(err=>{res.json({'error':'error in commiting SQL transaction '});});
}

//for update 
async function updateUser(req, res) {
    await e.initializeData(req, res);
    await e.beginTransaction();
    await e.getEmployeeIdForUpdate(req);
    await e.setEmployeeDetails(req, res);
    e.getRequest();
    await e.updateEmployeeDetails();
    await e.updateTemporaryAddress();
    await e.updatePermanentAddress();
    await e.updateProfessionalDetails();
    await e.updateEmergencyDetails();
    await e.insertCV();
    await e.insertCitizenship();
    await e.commitTransaction(req, res);
}

function getDataForPopup(req,res){
    /* 
    profile pic
    name
    type of employee
    emails both
    dob
    ctzen number
    pic of ctzen
    perma address
    temp add
    jon data 
    end datae\
    dept
    skills 
    all emergency details 
    */
    let query="select ";
}
module.exports = {
    getAllUsersForAdminDashboard,
    createUser,
    updateUser,
    getDetailsForUpdate,
    deleteUser,
    getDataForPopup ///incomplete set up other first 
}