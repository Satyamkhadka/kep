const db = require('./db');
const multer = require('multer');
const path = require('path');


//for image upload
//storage of multer
const storage = multer.diskStorage({
    destination: './assets/',
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({
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

//end of image upload



//initializing the request datas
function initializeData(req, res) {
    return new Promise((resolve, reject) => {
        upload(req, res, (err) => {
            if (err) {
                res.send(err);
                reject();
            } else {
                //console.log(req.files);
                gottenFiles=req.files;
                //console.log(gottenFiles);
                resolve();
            }
        });
        
    });
}



//setting employee details
function setEmployeeDetails(req, upload, res) {
    return new Promise((resolve, reject) => {
        employeeDetails = [
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
        addressTempDetails = [
            req.body.tstreet,
            req.body.tcity,
            req.body.tprovince,
            req.body.tcountry,
            req.body.tzipCode,
            'T'
        ];
        addressPermaDetails = [
            req.body.pstreet,
            req.body.pcity,
            req.body.pprovince,
            req.body.pcountry,
            req.body.pzipCode,
            'P'
        ];
        proDetails = [
            req.body.joinDate,
            req.body.endDate,
            req.body.department,
            //req.body.resume,
            req.body.skill
        ];
        emergencyContact = [
            req.body.EFullName,
            req.body.EMobileNumber,
            req.body.email,
            req.body.relationship
        ];
        citizenNumber = req.body.citizenshipNo;
        // console.log(employeeDetails);
        fileDetails= req.file;
        resolve();
    });

}

function getRequest() {
    console.log(gottenFiles[0]);
}

function beginTransaction() {
    return new Promise((resolve,reject)=>{
        console.log("transaction started");
    db.beginTransaction(err=>{
        if(err){
            console.log(err);
            reject();
        }
        else{
            resolve();
        }
    });
    });
    

}

function insertEmployeeDetails() {
    return new Promise((resolve, reject) => {
        let query = "insert into employeeDetails (typeOfEmployee,fullName,gender,DOB,phoneNumber,mobileNumber,officialEmail,personalEmail,citizenshipNumber) values(?,?,?,?,?,?,?,?,?)"

        db.query(query, employeeDetails, (err, data) => {
            if (err) {
                console.log(err);
                console.log("error in inserting details Rolling Back");
                db.rollback();
                //res.sendStatus(500);
                reject();
            } else {
                console.log("details inserted.  part 1 of 4");
                resolve();
            }
        });

    });

}
//end of getting details 


//getEmployeeId for creating 
//gets from the data base 
function getEmployeeId() {
    return new Promise((resolve, reject) => {

        let q = "select employeeId from employeeDetails where citizenshipNumber=" + "'" + citizenNumber + "'";

        db.query(q, (err, data) => {
            if (err) {
                console.log(err);
                db.rollback();
                //res.sendStatus(500);
                rej(err);
            } else {
                console.log(data[0].employeeId + ' is new generated employeeId');
                employeeId = data[0].employeeId;
                //up >.> setting global variable for employee id 
                resolve();
            }
        });
    });
}

function getEmployeeIdForUpdate(req){
    return new Promise((resolve,reject)=>{
        employeeId=req.body.employeeId;
        console.log(employeeId);
        resolve();
    });
}
//end of getting employeeId

//inserting address temprory and permanant
function insertTemporaryAddress() {

    return new Promise((resolve,reject)=>{

        addressTempDetails.unshift(employeeId);

    let query = "insert into employeeAddressDetails (employeeId,street,city,province,country,zipCode,addressType) values(?,?,?,?,?,?,?)";
    db.query(query, addressTempDetails, (err, data) => {
        if (err) {
            console.log(err);
            db.rollback();
            rej(err);
            //res.sendStatus(500);
        } else {
            console.log("inserted temporary address.. (i)");
            resolve();
        }
    });

    });
}
function insertPermanentAddress() {

    return new Promise((resolve,reject)=>{

    addressPermaDetails.unshift(employeeId);

    let query2 = "insert into employeeAddressDetails (employeeId,street,city,province,country,zipCode,addressType) values(?,?,?,?,?,?,?)";
    db.query(query2, addressPermaDetails, (err, data) => {
        if (err) {
            console.log(err);
            db.rollback();
            //res.sendStatus(500);
            reject(err);
        } else {
            console.log('inserted Permanent address part 2 of 4..');
            resolve();
        }
    });
    });
}
//end of inserting address


//function to insert professional details
   function insertProfessionalDetails(){

    return new Promise((resolve, reject) => {

        proDetails.unshift(employeeId);
        //did a silly mistake here wasted some 40 mins or so
        let query = "insert into employeeProfessionalDetails (employeeId,joinDate,endDate,department,skill) values(?,?,?,?,?)";
        db.query(query, proDetails, (err,data) => {
            if (err) {
                console.log(err);
                db.rollback();
                //res.sendStatus(500);
                reject();
            } else {
                console.log('inserted professional details part 3 of 4');
                resolve();
            }
        });
    });
} 
//end of inserting professional details 

//inserting into emergency table
function insertEmergencyTable(){

    return new Promise((resolve, reject) => {
        emergencyContact.unshift(employeeId);
        let query = "insert into employeeEmergencyDetails (employeeId,eFullName,eMobileNo,email,relationship) values(?,?,?,?,?)";
        db.query(query, emergencyContact, (err, data) => {
            if (err) {
                console.log(err);
                db.rollback();
                //res.sendStatus(500);
                reject();
            } else {
                console.log('inserted emergency contact part 4 of 4 ');
                resolve();
            }
        });

    });
}

function insertCV(){
    
    return new Promise((resolve,reject)=>{
    db.query('update employeeProfessionalDetails set resume= "'+gottenFiles[1].filename+'" where employeeId='+employeeId,(err)=>{

        if(err){
            console.log(err);
            db.rollback();
            // res.sendStatus(500);
           reject();
        } else {
            console.log("CV uploaded");
            resolve();
        }
    }); 
});
}
    function insertCitizenship(req,res){
           return new Promise((resolve,reject)=>{
    db.query('update employeeDetails set citizenshipDigitalCopy= "'+gottenFiles[0].filename+'" where employeeId='+employeeId,(err)=>{

        if(err){
            console.log(err);
            db.rollback();
            //res.sendStatus(500);
            reject();
        } else {
            console.log('citizenship digital copy inserted');
            resolve();
        }
    });
}); 
    }

function commitTransaction(req,res) {
    return new Promise((resolve,reject)=>{
        db.commit((err) => {
            if (err) {
                db.rollback();
                console.log('rolling back');
                reject();
            } else
                try{
                res.sendStatus(200);
                resolve();
                } catch(error){ console.log("error message sent");} //double sending of response to the browser
        });
    });
   
}
//end of insertions

//start of updatings and all 
//updating employee details 
function updateEmployeeDetails(){

    return new Promise((resolve,reject)=>{
        employeeDetails.push(employeeId);
        console.log(employeeDetails);
        let query1 = "update  employeeDetails set typeOfEmployee= ?,  fullName= ?,  gender= ?,  DOB= ?,  phoneNumber= ?,  mobileNumber= ?,  officialEmail= ?,  personalEmail= ?,  citizenshipNumber= ? where employeeId= ?";

        db.query(query1, employeeDetails, (err, data) => {
            if (err) {
                console.log(err);
                db.rollback();
                reject(err);
            } else {
                console.log("1 of 4");
                resolve();
            }
        });
    });
}
//end of employee basic detail
// updating temporary address
function updateTemporaryAddress(){

    return new Promise((resolve,reject)=>{
        addressTempDetails.push(employeeId);
        let query2 = "update employeeAddressDetails set  street= ?,  city= ?,  province= ?,  country= ?,  zipCode= ?,addressType=? where employeeId= ?";
        db.query(query2, addressTempDetails, (err, data) => {
            if (err) {
                console.log(err);
                db.rollback();
                reject(err);
            } else {
                console.log("i");
                resolve();
            }
        });
    });
}

//updating pemanent address 
function updatePermanentAddress(){

    return new Promise((resolve,reject)=>{
        addressPermaDetails.push(employeeId);
        let query2 = "update employeeAddressDetails set  street= ?,  city= ?,  province= ?,  country= ?,  zipCode= ?,addressType=? where employeeId= ?";
        db.query(query2, addressPermaDetails, (err, data) => {
            if (err) {
                console.log(err);
                console.log("from 3");
                db.rollback();
                reject(err);
            } else {
                console.log('2 of 3');
                resolve();
            }
        });
    });
} 
//end of address update

function updateProfessionalDetails(){

    return new Promise((resolve,reject)=>{
        proDetails.push(employeeId);
        let query = "update employeeProfessionalDetails set  joinDate= ?,  endDate= ?,  department= ?, skill= ? where employeeId= ?";
        db.query(query, proDetails, (err, data) => {
            if (err) {
                console.log(err);
                db.rollback();
                reject(err);
            } else {
                console.log('updated pro details');
                resolve();
            }
        });
    });
}
//end of professional details 
//updating emergency detaisl 
function updateEmergencyDetails(){

    return new Promise((resolve,reject)=>{
        emergencyContact.push(employeeId);
        let query = "update employeeEmergencyDetails set  eFullName= ?,  eMobileNo= ?,  email= ?,  relationship= ? where employeeId= ?";
            db.query(query, emergencyContact, (err, data) => {
                if (err) {
                    console.log(err);
                    db.rollback();
                    reject(err);
                } else {
                    console.log('4 of 4');
                    resolve();
                }
            });
    });
}
//end of updates 
// image is updated by the create mechanism 


module.exports = {
    //for creating 
    //some are reused for updade too
    setEmployeeDetails,
    beginTransaction,
    getRequest,
    initializeData,
    insertEmployeeDetails,
    getEmployeeId,
    insertTemporaryAddress,
    insertPermanentAddress,
    insertProfessionalDetails,
    insertEmergencyTable,
    insertCV,
    insertCitizenship,
    commitTransaction,
    //for update part
    getEmployeeIdForUpdate,
    updateEmployeeDetails,
    updateTemporaryAddress,
    updatePermanentAddress,
    updateProfessionalDetails,
    updateEmergencyDetails,
}


//temp
/* this.fullName = fullName;
       this.typeOfEmployee = typeOfEmployee;
       this.gender = gender;
       this.DOB = DOB;
       this.phoneNumber = phoneNumber;
       this.mobileNumber = mobileNumber;
       this.officialEmail = officialEmail;
       this.personalEmail = personalEmail;
       this.citizenshipNumber = citizenshipNumber; */

/* this.employeeDetails = [
    this.fullName = fullName,
    this.typeOfEmployee = typeOfEmployee,
    this.gender = gender,
    this.DOB = DOB,
    this.phoneNumber = phoneNumber,
    this.mobileNumber = mobileNumber,
    this.officialEmail = officialEmail,
    this.personalEmail = personalEmail,
    this.citizenshipNumber = citizenshipNumber
        ] */
