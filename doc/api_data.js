define({ "api": [
  {
    "type": "get",
    "url": "/",
    "title": "",
    "name": "none",
    "group": "Test",
    "description": "<p>this api is just for checkings and all this api basically has no input as well as output</p>",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP 200 OK",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UnableToConnect",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP 404 Not Found",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./Routes.js",
    "groupTitle": "Test"
  },
  {
    "type": "post",
    "url": "/createUser",
    "title": "",
    "name": "Create_User",
    "group": "User",
    "description": "<p>This api creates new User (employee) multipart/form-data type</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "optional": false,
            "field": "typeOfEmployee",
            "description": "<p>Type of Employee</p>"
          },
          {
            "group": "Parameter",
            "optional": false,
            "field": "fullName",
            "description": "<p>full name of employee</p>"
          },
          {
            "group": "Parameter",
            "optional": false,
            "field": "gender",
            "description": "<p>gender</p>"
          },
          {
            "group": "Parameter",
            "optional": false,
            "field": "dob",
            "description": "<p>date of birth(Y-M-D) default sql format</p>"
          },
          {
            "group": "Parameter",
            "optional": false,
            "field": "phoneNumber",
            "description": "<p>phone number</p>"
          },
          {
            "group": "Parameter",
            "optional": false,
            "field": "mobileNumber",
            "description": "<p>mobile number</p>"
          },
          {
            "group": "Parameter",
            "optional": false,
            "field": "officialEmail",
            "description": "<p>official email</p>"
          },
          {
            "group": "Parameter",
            "optional": false,
            "field": "personalEmail",
            "description": "<p>personal email</p>"
          },
          {
            "group": "Parameter",
            "optional": false,
            "field": "citizenshipNo",
            "description": "<p>citizenship number (must have)</p>"
          },
          {
            "group": "Parameter",
            "optional": false,
            "field": "tstreet",
            "description": "<p>Temporary street address</p>"
          },
          {
            "group": "Parameter",
            "optional": false,
            "field": "tcity",
            "description": "<p>Temporary city name</p>"
          },
          {
            "group": "Parameter",
            "optional": false,
            "field": "tprovince",
            "description": "<p>Temporary province</p>"
          },
          {
            "group": "Parameter",
            "optional": false,
            "field": "tcountry",
            "description": "<p>temporary country</p>"
          },
          {
            "group": "Parameter",
            "optional": false,
            "field": "tzipCode",
            "description": "<p>temp zip code</p>"
          },
          {
            "group": "Parameter",
            "optional": false,
            "field": "pstreet",
            "description": "<p>permanent street address</p>"
          },
          {
            "group": "Parameter",
            "optional": false,
            "field": "pcity",
            "description": "<p>permanenet city address</p>"
          },
          {
            "group": "Parameter",
            "optional": false,
            "field": "pprovince",
            "description": "<p>permanent province</p>"
          },
          {
            "group": "Parameter",
            "optional": false,
            "field": "pcountry",
            "description": "<p>permanent country</p>"
          },
          {
            "group": "Parameter",
            "optional": false,
            "field": "pzipCode",
            "description": "<p>permanent zip code</p>"
          },
          {
            "group": "Parameter",
            "optional": false,
            "field": "joinDate",
            "description": "<p>joind date (Y-M-D) sql default</p>"
          },
          {
            "group": "Parameter",
            "optional": false,
            "field": "endDate",
            "description": "<p>(y-m-d) sql default</p>"
          },
          {
            "group": "Parameter",
            "optional": false,
            "field": "department",
            "description": "<p>department</p>"
          },
          {
            "group": "Parameter",
            "optional": false,
            "field": "skill",
            "description": "<p>skills (comma seperated or any string)</p>"
          },
          {
            "group": "Parameter",
            "optional": false,
            "field": "EFullName",
            "description": "<p>Emergency contact's full name</p>"
          },
          {
            "group": "Parameter",
            "optional": false,
            "field": "EMobileNumber",
            "description": "<p>Emergency contacts number</p>"
          },
          {
            "group": "Parameter",
            "optional": false,
            "field": "email",
            "description": "<p>Emergency contact email</p>"
          },
          {
            "group": "Parameter",
            "optional": false,
            "field": "relationship",
            "description": "<p>realtionship of emergency contact personnel to the employee</p>"
          },
          {
            "group": "Parameter",
            "optional": false,
            "field": "citizenDigitalCopy",
            "description": "<p>sent from multipart/form-data header</p>"
          },
          {
            "group": "Parameter",
            "optional": false,
            "field": "resume",
            "description": "<p>sent from multipart/form-data header</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP 200 OK",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "SQLErrors",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n  \"error\": \"Error description\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./Routes.js",
    "groupTitle": "User"
  },
  {
    "type": "get",
    "url": "/userForAdminDashboard",
    "title": "",
    "name": "Get_User_For_Admin_DashBoard",
    "group": "User",
    "description": "<p>this api gives data for admin panel data includes employee details</p>",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "firstname",
            "description": "<p>Firstname of the User.</p>"
          },
          {
            "group": "Success 200",
            "optional": false,
            "field": "employeeId",
            "description": "<p>Employee's Id</p>"
          },
          {
            "group": "Success 200",
            "optional": false,
            "field": "fullName",
            "description": "<p>FullName of the Employee</p>"
          },
          {
            "group": "Success 200",
            "optional": false,
            "field": "typeOfEmployee",
            "description": "<p>Type Of Employee must be Intern Admin or Employee</p>"
          },
          {
            "group": "Success 200",
            "optional": false,
            "field": "department",
            "description": "<p>Department of work</p>"
          },
          {
            "group": "Success 200",
            "optional": false,
            "field": "officialEmail",
            "description": "<p>Self-Explanatory</p>"
          },
          {
            "group": "Success 200",
            "optional": false,
            "field": "joinDate",
            "description": "<p>Joined date of employee Y-M-D format(default sql format)</p>"
          },
          {
            "group": "Success 200",
            "optional": false,
            "field": "MobileNumber",
            "description": "<p>Self-Explanatory</p>"
          },
          {
            "group": "Success 200",
            "optional": false,
            "field": "endDate",
            "description": "<p>End date of the Employee (if it exists employee no longer works for the company)</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "   {\n\"employeeId\":165,\n\"fullName\":\"manisha\",\n\"typeOfEmployee\":\"owner\",\n\"department\":\"sdptfgdf\",\n\"officialEmail\":\"hghjhhfgh\",\n\"joinDate\":\"1999-10-20T18:15:00.000Z\",\n\"MobileNumber\":\"sataaf\",\n\"endDate\":\"1999-10-20T18:15:00.000Z\"\n     }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "SQL_Error",
            "description": "<p>sql failure</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./Routes.js",
    "groupTitle": "User"
  }
] });
