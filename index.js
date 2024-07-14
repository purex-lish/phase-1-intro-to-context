// Your code here
function parseTime(timeStr) {
    let [date, time] = timeStr.split(' ');
    let [year, month, day] = date.split('-');
    let hours = parseInt(time.slice(0, -2));
    let minutes = parseInt(time.slice(-2));
    return { year, month, day, hours, minutes };
  }

  function calculateHours(timeInStr, timeOutStr) {
    let timeIn = parseTime(timeInStr);
    let timeOut = parseTime(timeOutStr);
  
    // Calculate total minutes for each timestamp
    let totalMinutesIn = timeIn.hours * 60 + timeIn.minutes;
    let totalMinutesOut = timeOut.hours * 60 + timeOut.minutes;
  
    // Calculate the difference in hours
    let hoursWorked = (totalMinutesOut - totalMinutesIn) / 60;
    return hoursWorked;
  }
//employee record function
  function createEmployeeRecord(arr) {
    return {
      firstName: arr[0],
      familyName: arr[1],
      title: arr[2],
      payPerHour: arr[3],
      timeInEvents: [],
      timeOutEvents: []
    };
}
    function createEmployeeRecords(arrays) {
        return arrays.map(arr => createEmployeeRecord(arr));
      }
  
  
  function createTimeInEvent(employeeRecord, timeInStr) {
    let [date, hour] = timeInStr.split(' ');
  hour = parseInt(hour);
  employeeRecord.timeInEvents.push({ type: 'TimeIn', date, hour });
    return employeeRecord;
  }
  
  function createTimeOutEvent(employeeRecord, timeOutStr) {
    let [date, hour] = timeOutStr.split(' ');
  hour = parseInt(hour);
  employeeRecord.timeOutEvents.push({ type: 'TimeOut', date, hour });
    return employeeRecord;
  }
  
  function hoursWorkedOnDate(employeeRecord, date) {
    let timeIn = employeeRecord.timeInEvents.find(event => event.date === date);
    let timeOut = employeeRecord.timeOutEvents.find(event => event.date === date);
  
    if (timeIn && timeOut) {
        let hoursWorked = (timeOut.hour - timeIn.hour) / 100;
        return hoursWorked;
    } else {
      return 0;
    }
  }
  //payroll function
  function calculatePayroll(employeeRecords) {
    return employeeRecords.reduce((totalPayroll, employee) => {
      return totalPayroll + allWagesFor(employee);
    }, 0);
  }
  
  function wagesEarnedOnDate(employeeRecord, date) {
    let hoursWorked = hoursWorkedOnDate(employeeRecord, date);
    return hoursWorked * employeeRecord.payPerHour;
  }
  
  function allWagesFor(employeeRecord) {
    let datesWorked = employeeRecord.timeInEvents.map(event => event.date);
  
    let totalWages = datesWorked.reduce((total, date) => {
      return total + wagesEarnedOnDate(employeeRecord, date);
    }, 0);
  
    return totalWages;
  }
  