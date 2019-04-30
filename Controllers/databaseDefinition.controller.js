
    const db= require('../Model/db.js');
    const mysql=require('mysql');

var createDatabase = function (req,res) {

let query = 'create database if not exists kep';
console.log(query);
db.query(query,(err) => {
    if (err) {
        console.log(err);
        res.sendStatus(500);
    }
    else{
    res.sendStatus(201);
    }
});

};

var createEmployeeDetailsTable=function(req,res){

    let query= 'create table if not exists employeeDetails ('
                +' employeeId             int primary key auto_increment,'
                +'fullName               varchar(50) ,'
                +'password                varchar(300),'
                +'typeOfEmployee         varchar(10) ,'
                +'CONSTRAINT checkEmployeeType CHECK (typeOfEmployee IN ("Admin","Employee","Intern")) ,'
                +'gender                 varchar(6) ,'
                +'CONSTRAINT checkGender CHECK (gender IN ("Male","Female","Others")) ,'
                +'DOB                    date ,'
                +'phoneNumber            varchar(16) ,'
                +'mobileNumber           varchar(16) ,'
                +'profilePic              varchar(80) default "default.png",'
                +'officialEmail          varchar(50) ,'
                +'personalEmail          varchar(50) ,'
                +'citizenshipNumber      varchar(30) unique not null,'
                +'citizenshipDigitalCopy varchar(80) '
                +') ';

    db.query(query, (err) => {
        if (err) {
            console.log(err);
            res.sendStatus(500);
        }
        else{
        console.log('Successful');
        res.sendStatus(201);
        }
    });
}
var createEmployeeAddressDetailsTable=function(req,res){

    let query= 'create table if not exists employeeAddressDetails ('
                +'addressId                 int primary key auto_increment,'
                +' employeeId             int  ,'
                +' foreign key (employeeId) references employeeDetails(employeeId) on delete cascade ,'
                +'street               varchar(30) ,'
                +'city         varchar(30) ,'
                +'province                 varchar(30) ,'
                +'country                    varchar(30) ,'
                +'zipCode            varchar(5) ,'
                +'addressType           char(1) ,'
                +'CONSTRAINT checkAddress CHECK (addressType IN ("T","P")) '
                +') ';

    db.query(query, (err) => {
        if (err) {
            console.log(err);
            res.sendStatus(500);
        }
        else{
        console.log('Successful');
        res.sendStatus(201);
        }
    });
}

var createEmployeeProfessionalDetailsTable=function(req,res){

    let query= 'create table if not exists employeeProfessionalDetails ('
                +'professionalId                 int primary key auto_increment,'
                +' employeeId             int  ,'
                +' foreign key (employeeId) references employeeDetails(employeeId) on delete cascade,'
                +'joinDate               date ,'
                +'endDate         date ,'
                +'department                 varchar(30) ,'
                +'resume                    varchar(80) ,'
                +'skill            varchar(50) '
                +') ';

    db.query(query, (err) => {
        if (err) {
            console.log(err);
            res.sendStatus(500);
        }
        else{
        console.log('Successful');
        res.sendStatus(201);
        }
    });
}

var createEmployeeEmergencyDetailsTable=function(req,res){

    let query= 'create table if not exists employeeEmergencyDetails ('
                +'emergencyContactId                 int primary key auto_increment,'
                +' employeeId             int ,'
                +' foreign key (employeeId) references employeeDetails(employeeId) on delete cascade,'
                +'eFullName               varchar(50),'
                +'eMobileNo         varchar(16) ,'
                +'email                 varchar(50) ,'
                +'relationship                    varchar(30) '
                +') ';

    db.query(query, (err) => {
        if (err) {
            console.log(err);
            res.sendStatus(500);
        }
        else{
        console.log('Successful');
        res.sendStatus(201);
        }
    });
}

var createAttendanceTable=function(req,res){

    let query= 'create table if not exists attendance ('
                +'attendanceDate  date,'
                +'inTime time,'
                +'outTime time,'
                +'clockIn time,'
                +'clockOut time,'
                +'late int,'
                +'early int,'
                +'absent char(1),'
                +' employeeId             int ,'
                +' primary key(attendanceDate,employeeId),'
                +' foreign key (employeeId) references employeeDetails(employeeId) on delete cascade'
                +' ) ';

    db.query(query, (err) => {
        if (err) {
            console.log(err);
            res.sendStatus(500);
        }
        else{
        console.log('Successful');
        res.sendStatus(201);
        }
    });
}

   

var createLeaveTable=function(req,res){
/* 
    let query= 'create table if not exists leaveDays ('
    +'leaveId  int,'
    +' leaveDate             date ,'
    +' foreign key (leaveId) references employeeLeave(leaveId) on delete cascade'
    +' ) '; */

    let query1= 'create table if not exists employeeLeave ('
                +' leaveID int primary key auto_increment,'
                +'leaveDays  varchar(30),'
                +'dateRequested date,'
                +'typeOfLeave varchar(15),'
                +'CONSTRAINT checkLeave CHECK (typeOfLeave IN ("Paid","Unpaid","Others")) ,'
                +'amount varchar(10),'
                +'CONSTRAINT checkAmount CHECK (amount IN ("Full-Day","Half-Day")) ,'
                +'status varchar(10) default "pending",'
                +'CONSTRAINT checkGender CHECK (gender IN ("Approved","Declined","Pending")) ,'
                +' employeeId             int ,'
                +' foreign key (employeeId) references employeeDetails(employeeId) on delete cascade'
                +' ) ';

    db.query(query1, (err) => {
        if (err) {
            console.log(err);
            res.sendStatus(500);
        }
        else{
        console.log('leave table created ');
            res.sendStatus(201);
        /* db.query(query, (err) => {
            if (err) {
                console.log(err);
                res.sendStatus(500);
            }
            else{
            
            }
        }); */
        }
    });

}
function createNoticeTable(req,res){
    
    let query= 'create table if not exists notice ('
    +'noticeId int auto_increment primary key, '
    +'date date,N'
    +'heading varchar(100) , '
    +'description varchar(500),'
    +'visibility char(1) default "1" '
    +') ';

db.query(query, (err) => {
if (err) {
console.log(err);
res.sendStatus(500);
}
else{
console.log('Successful');
res.sendStatus(201);
}
});
}
function createReminderTable(req,res){
    
    let query= 'create table if not exists reminder ('
    +'reminderId int auto_increment primary key, '
    +'heading varchar(100) , '
    +'description varchar(500),'
    +'rDate date,'
    +'rTime time ,'
    +'days varchar(20),'
    +'visibility char(1) default "1" '
    +') ';

db.query(query, (err) => {
if (err) {
console.log(err);
res.sendStatus(500);
}
else{
console.log('Successful');
db.end();
res.sendStatus(201);
}
});
}



module.exports={
createDatabase,
createEmployeeDetailsTable,
createEmployeeAddressDetailsTable,
createEmployeeProfessionalDetailsTable,
createEmployeeEmergencyDetailsTable,
createAttendanceTable,
createLeaveTable, //auto increment done but not deployed
createNoticeTable,
createReminderTable,
};