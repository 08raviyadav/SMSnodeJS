const fs = require('fs');
const _ = require('lodash');
var read_attd = () => {
    try {
        var rawdata = fs.readFileSync('attendence_data.json');
        attendence = JSON.parse(rawdata);
        return attendence;
    } catch (e) {
        return [];
    }
}
var write_attd = (data_update) => {

    fs.writeFileSync('attendence_data.json', JSON.stringify(data_update));
}
var mark_attd = (data_update) => {

    fs.writeFileSync('attendence_issue_register.json', JSON.stringify(data_update));
}

var add_attd = (roll_no, name, crs_code,reg) => {
    var attendence = read_attd();
    var new_item = {
        roll_no,
        name,
        crs_code,
        reg
    };

    var get_id = attendence.filter((new_item) => new_item.roll_no === roll_no);

    if (get_id.length > 0) {

        new_item.crs_code = new_item.crs_code + get_id[0].crs_code;
        var filtereddata = attendence.filter((new_item) => new_item.roll_no !== roll_no);
        filtereddata.push(new_item);
        write_attd(filtereddata);
    } else {
        attendence.push(new_item);
        write_attd(attendence);
    }
}

var remove_attd = (roll_no, crs_code) => {
    var attendence = read_attd();
    var get_id = attendence.filter((fetched_data) => fetched_data.roll_no === roll_no);

    if (get_id.length > 0) {

        get_id[0].crs_code = get_id[0].crs_code - crs_code;

        if (get_id[0].crs_code >= 0) {
            var filtereddata = attendence.filter((fetched_data) => fetched_data.roll_no !== roll_no);
            filtereddata.push(get_id[0]);
            write_attd(filtereddata);
        } else {
            console.log("invalid.");
        }
    } else {
        console.log("Error 404 not found.")
    }
}
var show_all_attd = () => {
    var attendence = read_attd();
    console.log(attendence);
}
var attd_mark = (roll_no, crs_code, m_id, date) => {
    attendence = read_attd();
    members = read_member_data();
    issues = read_issue_data();

    var filteredinv = attendence.filter((fetched_item) => fetched_item.roll_no == roll_no);
    var filteredmem = members.filter((fetched_mem) => fetched_mem.m_id == m_id);

    if (filteredinv.length > 0 & filteredmem.length > 0) {
        var m_name = filteredmem[0].m_name;
        var name = filteredinv[0].name;
        var new_issue = {
            roll_no,
            name,
            m_name,
            crs_code
        }

        remove_attd(roll_no, crs_code);
        issues.push(new_issue);
        mark_attd(issues);

    } else {
        if (filteredinv.length <= 0)
            console.log("Item not found.");
    }
    if (filteredmem.length <= 0)
        console.log("Member not found");

}
var show_avail_attd = () => {
    var attendence = read_attd();

    filteredinv = attendence.filter((fetched_item) => fetched_item.crs_code > 0);
    console.log("Total attendence oof the student->");
    console.log(filteredinv);
}

module.exports = {
    read_attd,
    write_attd,
    add_attd,
    remove_attd,
    show_all_attd,
    mark_attd,
    attd_mark,
    show_avail_attd
}