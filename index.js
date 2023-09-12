function createEmployeeRecord(employee) {
    let empInfo = {
        firstName: employee[0],
        familyName: employee[1],
        title: employee[2],
        payPerHour: employee[3],
        timeInEvents: [],
        timeOutEvents: []
    }
    return empInfo
}

function createEmployeeRecords(employees) {
    return employees.map(employee => createEmployeeRecord(employee))
}

function createTimeInEvent(timeIn) {
    const [date, hour] = timeIn.split(' ');
    this.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date: date
    })
    return this
}

function createTimeOutEvent(timeOut) {
    const [date, hour] = timeOut.split(' ');
    this.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date: date
    })
    return this
}

function hoursWorkedOnDate(date) {
    return ((this.timeOutEvents.find(e => e.date === date)).hour - (this.timeInEvents.find(e => e.date === date)).hour)/100
}

function wagesEarnedOnDate(date) {
    return hoursWorkedOnDate.call(this, date) * this.payPerHour
}

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

function findEmployeeByFirstName(array, employee) {
    return array.find(emp => emp.firstName === employee)
}

function calculatePayroll(array) {
    return array.reduce((total, employee) => total + allWagesFor.call(employee), 0)
}

