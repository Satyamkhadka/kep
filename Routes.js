const express = require('express');

const app = express();


//controllers importing
//ddl
const databaseFrame = require('./Controllers/databaseDefinition.controller');
//users controller
const userController = require('./Controllers/users.controller');
//attendance Controller
const attendanceController = require('./Controllers/attendance.controller');
//image controller
const imageController = require('./Controllers/image.controller');
//notice controller
const noticeController = require('./Controllers/notice.controller');
//reminder controller
const reminderController = require('./Controllers/reminder.controller');
//leave controller
const leaveController = require('./Controllers/leave.controller');



//route for testing
/**
 * @api {get} / 
 * @apiName none 
 * @apiGroup Test
 * @apiDescription 
 * this api is just for checkings and all 
 * this api basically has no input as well as output
 * 
 * @apiSuccessExample Success-Response:
 * HTTP 200 OK
 * 
 * @apiError UnableToConnect
 * 
 * @apiErrorExample Error-Response:
 * HTTP 404 Not Found
 * 
 */
app.get('/', (req, res) => {
    res.sendStatus(202);
});
//end of test


//route to create database
app.get('/createDatabase/:databaseName', databaseFrame.createDatabase);
//route to create employee details table
app.get('/createEmployeeDetailsTable', databaseFrame.createEmployeeDetailsTable);
//route to create address table
app.get('/createEmployeeAddressDetailsTable', databaseFrame.createEmployeeAddressDetailsTable);
//route to pprofessional details
app.get('/createEmployeeProfessionalDetailsTable', databaseFrame.createEmployeeProfessionalDetailsTable);
//route to emergency contact 
app.get('/createEmployeeEmergencyDetailsTable', databaseFrame.createEmployeeEmergencyDetailsTable);
//route to attendance 
app.get('/createAttendanceTable', databaseFrame.createAttendanceTable);
//route to leave table
app.get('/createLeaveTable', databaseFrame.createLeaveTable);
//route to create notice table 
app.get('/createNoticeTable', databaseFrame.createNoticeTable);
//route to create reminder table
app.get('/createReminderTable', databaseFrame.createReminderTable);


//users part in admin panel
//route to showing all users on dashboard
/**
 * @api {get} /userForAdminDashboard
 * @apiName Get User For Admin DashBoard
 * @apiGroup User
 * @apiDescription 
 * this api gives data for admin panel
 * data includes employee details
 *
 *
 * @apiSuccess firstname Firstname of the User.
 * @apiSuccess employeeId Employee's Id	
 * @apiSuccess fullName FullName of the Employee
 * @apiSuccess typeOfEmployee	Type Of Employee must be Intern Admin or Employee
 * @apiSuccess department	Department of work
 * @apiSuccess officialEmail	Self-Explanatory
 * @apiSuccess joinDate Joined date of employee Y-M-D format(default sql format) 
 * @apiSuccess MobileNumber	Self-Explanatory
 * @apiSuccess endDate         End date of the Employee (if it exists employee no longer works for the company)
 *
 * @apiSuccessExample Success-Response:
 *    {
 * "employeeId":165,
 * "fullName":"manisha",
 * "typeOfEmployee":"owner",
 * "department":"sdptfgdf",
 * "officialEmail":"hghjhhfgh",
 * "joinDate":"1999-10-20T18:15:00.000Z",
 * "MobileNumber":"sataaf",
 * "endDate":"1999-10-20T18:15:00.000Z"
 *      }
 *
 * @apiError SQL_Error sql failure
 *
 * @apiErrorExample Error-Response:
 *     HTTP 500 Internal Server Error
 */
app.get('/userForAdminDashboard', userController.getAllUsersForAdminDashboard);


//  get data for admin popup
app.get('/getDataForPopup', userController.getDataForPopup);


//route to add users
/**
 * @api {post} /createUser 
 * @apiName Create User
 * @apiGroup User
 *@apiDescription 
 * This api creates new User (employee)
 * multipart/form-data type
 * 
 * 
*  @apiParam typeOfEmployee Type of Employee
*  @apiParam fullName full name of employee
*  @apiParam gender gender 
*  @apiParam dob date of birth(Y-M-D) default sql format
*  @apiParam phoneNumber phone number
*  @apiParam mobileNumber mobile number
*  @apiParam officialEmail official email
*  @apiParam personalEmail personal email
*  @apiParam citizenshipNo citizenship number (must have)
*  @apiParam tstreet Temporary street address
*  @apiParam tcity Temporary city name
*  @apiParam tprovince Temporary province
*  @apiParam tcountry temporary country
*  @apiParam tzipCode temp zip code
*  @apiParam pstreet permanent street address
*  @apiParam pcity permanenet city address
*  @apiParam pprovince permanent province 
*  @apiParam pcountry permanent country
*  @apiParam pzipCode permanent zip code
*  @apiParam joinDate joind date (Y-M-D) sql default
*  @apiParam endDate (y-m-d) sql default
*  @apiParam department department
*  @apiParam skill skills (comma seperated or any string)
*  @apiParam EFullName Emergency contact's full name
*  @apiParam EMobileNumber Emergency contacts number 
*  @apiParam email Emergency contact email
*  @apiParam relationship realtionship of emergency contact personnel to the employee
*  @apiParam citizenDigitalCopy  sent from multipart/form-data header
*  @apiParam resume sent from multipart/form-data header 
 *
 * @apiSuccessExample Success-Response:
 *     HTTP 200 OK
 *
 * @apiError SQLErrors
 *
 * @apiErrorExample Error-Response:
 *     {
 *       "error": "Error description"
 *     }
 */
app.post('/createUser', userController.createUser);
//route to populate user update credentials by id
app.get('/getDetailsForUpdate/:employeeId', userController.getDetailsForUpdate);
//route to update user details
app.put('/updateUser', userController.updateUser);
//route to delete user by id 
app.get('/deleteUser/:employeeId', userController.deleteUser);
//creating user
app.post('/insertFromAdmin', imageController.handleAdminUpload);


//attendance parrt in the admin page
//route for searching
//route to get all employee nameN
app.get('/employeeNamesAndId/', attendanceController.getEmployeesName);
//search return values
app.get('/search/:year/:month', attendanceController.searchThis);
//app.get('/searchUsersAttendance/:id/:month/:year',attendanceController.attendanceDetails);


//leave part 
app.get('/populateLeaveRequests/:year/:month', leaveController.populate);
//create leave request 
app.post('/createLeaveRequest', leaveController.createLeaveRequest);
//change leave status
app.put('/changeLeaveStatus', leaveController.changeLeaveStatus);



//user profile 
///app.post('/updateUserProfile/:employeeId',imageController.handlePP);



//notice routes 
// insert notice
app.post('/createNotice', noticeController.createNotice);
// read notice
app.get('/readNotice', noticeController.readNotice);
//delete notice
app.get('/deleteNotice/:id', noticeController.deleteNotice);
//reminder routes
//insert reminder
app.post('/createReminder', reminderController.createReminder);
//read reminder
app.get('/readReminder', reminderController.readReminder);
//delete reminder
app.get('/deleteReminder/:id', reminderController.deleteReminder);
module.exports = app;


//notes
/* 

repair data base for attendance --done
make a password field in the employee detils  --done 
do some thing about the image uploasd ---done 


set attendancestatus to pending as default 
sat user profile to deafult sometng  --done 
*/

/* 
testing 

reminser and notice done 
sned after deleting to be doen 

*/