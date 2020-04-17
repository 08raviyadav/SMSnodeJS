console.log("Student Management System");

const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');
const sms_info = require('./attendance.js');

const args = yargs.argv;

var command = args._[0];

if (command === 'add') {
    var roll_no = args.rollNo;
    var reg = args.regd;
    var name = args.name;
    var crs_code = args.crs_code;
    sms_info.add_attd(roll_no, name,crs_code,reg);
} else if (command === 'remove') {
    var roll_no = args.rollNo;
    var crs_code = args.crs_code;
    sms_info.remove_attd(roll_no, name,crs_code,reg);
} else if (command === 'all') {
    sms_info.show_all_attd();
}  else if (command === 'total_attendence') {
    sms_info.show_avail_attd();
} else {
    console.log("Enter a valid operation");
}