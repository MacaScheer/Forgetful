
// to implement later down the line
tools() {
  return (
    <div>
      <button onClick={this.inputChar} value="^">
        <i className="fas fa-calendar" value="^" />
      </button>{" "}
      {/* duedate*/}
      {/* <button onClick={this.inputChar} value="~">
          b
        </button> */}
      {/* startdate*/}
      {/* <button onClick={this.inputChar} value="!">c</button> */}
      {/* <button onClick={this.inputChar} value="#">
          d
        </button> */}
      {/* priority */}
      <button onClick={this.inputChar} value="*">
        <i className="fas fa-list" value="*" />
      </button>
      {/* list */}
      <button onClick={this.inputChar} value="@">
        <i className="fas fa-tags" value="@" />
      </button>
      {/* tag */}
    </div>
  );
}

//using for parsing time 
var today = new Date(); // << how you set current date
var dd = String(today.getDate()).padStart(2, '0');
var yyyy = today.getFullYear();
//check if works for start_date === today

let numDays = 2;


      // let nextMonth = today.setMonth(thisMonth + 1);
      // let nextYear = today.setFullYear(thisYear + 1);
      // if (input === "today") return fuse.search(today);
      // if (input === "tomorrow") {
      //   return fuse.search(today.setDate(today.getDate() + 1));
      // }
      // if (input === "week") {
      //   return fuse.search(today.setDate(today.getDate() + 7));
      // }
      // if (input === "month") result = fuse.search(nextMonth);
      // if (input === "year") result = fuse.search(nextYear);
      // if (input === "thisMonday") {
      //   let mondayTasks = fuse.search("Mon");
      //   mondayTasks.forEach(task => {
      //     let day = task["start_date"];
      //     // if (String(day.getDate()).padStart(2, "0") - thisDay <= 7) {
      //     //   result = task;
      //     // }
      //   });
      // }


//

let today = new Date();
let todayString = today.toDateString();
let dayARR = todayString.split(" ");
let weekDayString = dayARR[0];
let dayINT = parseInt(dayARR[2])
let tomINT = dayINT + 1
let nextDATE;

if (input === 'tomorrow') {
  nextDATE = today.setDate(tomINT);
 }
if (input === "nextWeek") {
  if (weekDayString === 'Mon') {
    nextWeekINT = dayINT + 7;
  } else if(weekDayString === 'Tues'){
    nextWeekINT = dayINT + 6;
  } else if(weekDayString === 'Wed'){
    nextWeekINT = dayINT + 5;
  } else if (weekDayString === 'Thurs') {
    nextWeekINT = dayINT + 4;
  } else if (weekDayString === 'Fri') {
    nextWeekINT = dayINT + 3;
  } else if (weekDayString === 'Sat') {
    nextWeekINT = dayINT + 2;
  } else {
    nextWeekINT = dayINT + 1;
  }
  nextDATE = today.setDate(nextWeekINT);
}

//when query for this week ==> find tasks that are scheduled until the end of this week (Sunday)
// let nextWeekDATE = today.setDate(nextWeekINT);

result = fuse.search(tomDATE)


// let dd = String(today.getDate()).padStart(2, '0');
// let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
// let ddInt = parseInt(dd)
// let mmInt = parseInt(mm)


// find the day to add the new int to


// var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();