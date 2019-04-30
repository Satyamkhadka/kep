const multer=require('multer');
const db= require('../Model/db');
const path = require('path');
//storage of multer
const storage = multer.diskStorage({
    destination: './assets/',
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname));
    }
});

//init
const upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
        checkFiletype(file, cb)
    },
    limits: {
        fileSize: 500000
    }
}).single('profilePic');

const uploadd = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
        checkFiletype(file, cb)
    },
    limits: {
        fileSize: 500000
    }
}).any();//fields([{name:'resume',maxCount:1},{name:'citizenDigitalCopy',maxCount:1}]);
//check file type

function checkFiletype(file, cb) {
    //  allowed ecxtentins 
    const filetypes = /jpeg|jpg/;
    //check
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    //check mime
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb(new Error("only images"));
        
    }
}

function handlePP(req,res){
    upload(req, res, (err) => {
        if (err) {
            res.send(err);
        } else {
           // console.log(req.file);
            //console.log(storage);
            db.query('update employeeDetails set profilePic= "'+req.file.filename+'" where employeeId='+req.params.employeeId,(err)=>{

                if(err){
                    console.log(err);
                    res.sendStatus(500);
                } else {
                    res.sendStatus(200);
                }
            });
        }
    });
}


 function  handleAdminUpload(req,res){
        uploadd(req, res,(err) => {
            if (err) {
                res.send(err);
            } else {
                //console.log(req.files);
                console.log(req.body);
                console.log(req.files); 
                console.log(storage);
                return req.files;
                console.log('image inserted successfully');
            }
        });
    }



    /* 
    db.query('update employeeDetails set profilePic= "'+req.file.filename+'" where employeeId='+req.params.employeeId,(err)=>{
    
                        if(err){
                            console.log(err);
                            res.sendStatus(500);
                        } else {
                            res.sendStatus(200);
                        }
                    }); */
module.exports={
                handlePP,
                handleAdminUpload

}



var fileName;
var ccreateUser = function (req, res) {
    filename=imageController.handleAdminUpload(req, res);
    //prerequestisites
    pic=   new Promise((resolve,reject)=>{
        console.log('top');
        
        //console.log(filename);
        if(filename===undefined)
        reject('error');
        else 
        resolve('ok');
    });
    begin =   new Promise((resolve, rej) => {
        db.beginTransaction((err) => {
            if (err) {
                console.log(err);
                db.rollback();
                res.sendStatus(500);
                rej();
            } else {
                resolve();
            }
        });
    });

    edetails =   new Promise((res, rej) => {
        let employeeData = [
            req.body.typeOfEmployee,
            req.body.fullName,
            req.body.gender,
            req.body.dob,
            req.body.phoneNumber,
            req.body.mobileNumber,
            //req.body.profilePic,
            req.body.officialEmail,
            req.body.personalEmail,
            req.body.citizenshipNo,
            //req.body.citizenDigitalCopy
        ];
        if (employeeData === undefined)
            rej();
        else
            res(employeeData);
    });
    console.log(edetails);

    //inserting into main table
    insertInEmployeeData =   new Promise((resolve, rej) => {
        let employeeData = [
            req.body.typeOfEmployee,
            req.body.fullName,
            req.body.gender,
            req.body.dob,
            req.body.phoneNumber,
            req.body.mobileNumber,
            //req.body.profilePic,
            req.body.officialEmail,
            req.body.personalEmail,
            req.body.citizenshipNo,
            //req.body.citizenDigitalCopy
        ];
        console.log(employeeId);
        let query1 = "insert into employeeDetails (typeOfEmployee,fullName,gender,DOB,phoneNumber,mobileNumber,officialEmail,personalEmail,citizenshipNumber) values(?,?,?,?,?,?,?,?,?)"

        db.query(query1, employeeData, (err, data) => {
            if (err) {
                console.log(err);
                db.rollback();
                res.sendStatus(500);
                rej(err);
            } else {
                resolve();
                console.log("first insertion was okay ");
            }
        });
    });







    //getting generated employee id 
    employeeId =   new Promise((resolve, rej) => {
        let q = "select employeeId from employeeDetails where citizenshipNumber=" + "'" + req.body.citizenshipNo + "'";
        //console.log(req.body.citizenshipNo);

        db.query(q, (err, data) => {
            if (err) {
                console.log(err);
                console.log("from 2");
                db.rollback();
                res.sendStatus(500);
                rej(err);
            } else {
                console.log(data[0].employeeId+'bla alf');
                console.log('got employee id');
                resolve(data[0].employeeId);
            }
        });
    });

    ///inserting in temporary address details
    insertIntoAddressTempDetails =   new Promise((resolve, rej) => {
        let addressTempDetails = [
            employeeId,
            req.body.tstreet,
            req.body.tcity,
            req.body.tprovince,
            req.body.tcountry,
            req.body.tzipCode,
            'T'
        ];
        let query2 = "insert into employeeAddressDetails (employeeId,street,city,province,country,zipCode,addressType) values(?,?,?,?,?,?,?)";
        db.query(query2, addressTempDetails, (err, data) => {
            if (err) {
                console.log(err);
                console.log("from 3");
                rej(err);
                db.rollback();
                res.sendStatus(500);
            } else {
                resolve();
            }
        });

    });

    //inserting ointo permanentaddress table
    insertIntoAddressPermaDetails =   new Promise((resolve, rej) => {
        let addressPermaDetails = [
            employeeId,
            req.body.pstreet,
            req.body.pcity,
            req.body.pprovince,
            req.body.pcountry,
            req.body.pzipCode,
            'P'
        ];
        let query2 = "insert into employeeAddressDetails (employeeId,street,city,province,country,zipCode,addressType) values(?,?,?,?,?,?,?)";
        db.query(query2, addressPermaDetails, (err, data) => {
            if (err) {
                console.log(err);
                console.log("from 3");
                db.rollback();
                res.sendStatus(500);
                rej(err);
            } else {
                console.log('inserted address');
                resolve();
            }
        });

    });


    //professional details 

    insertIntProfessionalDetails =   new Promise((resolve, rej) => {

        let proDetails = [
            employeeId,
            req.body.joinDate,
            req.body.endDate,
            req.body.department,
            //req.body.resume,
            req.body.skill
        ];
        let query = "insert into employeeProfessionalDetails (employeeId,joinDate,endDate,department,skill) values(?,?,?,?,?)";
        db.query(query, proDetails, (err, data) => {
            if (err) {
                console.log(err);
                console.log("from 3");
                db.rollback();
                res.sendStatus(500);
                rej(err);
            } else {
                console.log('inserted pro details');
                resolve();
            }
        });

    });


    //insert into emergency contact table
    insertIntProfessionalDetails =   new Promise((resolve, rej) => {

        let emergencyContact = [
            employeeId,
            req.body.EFullName,
            req.body.EMobileNumber,
            req.body.email,
            req.body.relationship
        ];
        let query = "insert into employeeEmergencyDetails (employeeId,eFullName,eMobileNo,email,relationship) values(?,?,?,?,?)";
        db.query(query, emergencyContact, (err, data) => {
            if (err) {
                console.log(err);
                console.log("from 3");
                db.rollback();
                res.sendStatus(500);
                rej(err);
            } else {
                console.log('inserted emergency contact');
                resolve();
            }
        });

    });

    insertCV =   new Promise((resolve,reject)=>{
        db.query('update employeeDetails set resume= "'+req.files.resume.filename+'" where employeeId='+employeeId,(err)=>{

            if(err){
                console.log(err);
                db.rollback();
                res.sendStatus(500);
            } else {
                console.log("image uploaed");
                resolve();
            }
        });
    });
        insertCT =   new Promise((resolve,reject)=>{
        db.query('update employeeDetails set citizenDigitalCopy= "'+req.files.resume.filename+'" where employeeId='+employeeId,(err)=>{

            if(err){
                console.log(err);
                db.rollback();
                res.sendStatus(500);
            } else {
                resolve();
            }
        });
    }); 

    db.commit((err) => {
        if (err)
            db.rollback();
        else
            res.sendStatus(200);
    });

}
