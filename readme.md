<h1 align="center">Forgetful</h1>

<div align="center">Forgetful is a task management app that lets people keep track of daily/weekly tasks.
</div>

<div align="center">
  <!-- Stability -->
<img src="https://img.shields.io/badge/stability-experimental-orange.svg?style=flat-square"
      alt="API stability" />
  <!-- NPM version -->
  <img src="https://img.shields.io/badge/node-%3E%3D%206.0.0-brightgreen"
      alt="NPM version" />
  <!-- Build Status -->
 <img src="https://img.shields.io/badge/build-passing-brightgreen"
      alt="Build Status" />
</div>

[Live Site][1]

Forgetful is a task management app that lets people keep track of daily/weekly tasks.

## Technologies Used
 - React
 - Express.js
 - Node.js
 - Apollo / GraphQL
 - Fuse.js

### Task Index

![Task Index Page](https://github.com/MacaScheer/Forgetful/blob/master/signup1.png)

`

```
  attributeUpdater(data, id) {
    const clonedData = merge([], data[this.props.filterkey]);
    let itemIdx;
    clonedData.forEach((ele, idx) => {
      if (ele.name === this.props.filtername) itemIdx = idx;
    });
    clonedData[itemIdx].tasks.forEach((ele, idx) => {
      if (ele._id === id) clonedData[itemIdx].tasks.splice(idx, 1);
    });
    return clonedData;
  }
```

```

  runSearch(data) {
    if (this.state.keys === "search") return this.runSearchResult(data);
    const check = this.state.urlLength === 1;
    const modifiedData = check ? data.tasks : data[this.state.keys];
    let input = this.state.input;
    const filterKey = check ? this.state.keys : "name";
    const options = {
      keys: [filterKey],
      shouldSort: true,
      tokenize: true,
      findAllMatches: true,
      threshold: 0.2,
      location: 0,
      distance: 100,
      maxPatternLength: 32,
      minMatchCharLength: 1
    };

    let fuse = new Fuse(modifiedData, options);
    if (check) {
      let today = new Date();
      let todayString = today.toDateString();
      let dayARR = todayString.split(" ");
      let weekDayString = dayARR[0];
      let dayINT = parseInt(dayARR[2]);
      let tomINT = dayINT + 1;
      let taskList = [];
      let dueDateList = [];
      if (input === "today") {
        dueDateList.push(todayString);
      }
      if (input === "tomorrow") {
        today.setDate(tomINT);
        let tomorrowString = today.toDateString();
        dueDateList.push(tomorrowString);
      }
      if (input === "thisweek") {
        let numsARR = [];
        if (weekDayString === "Sun") {
          numsARR = [0, 1, 2, 3, 4, 5, 6, 7];
        } else if (weekDayString === "Mon") {
          numsARR = [0, 1, 2, 3, 4, 5, 6];
        } else if (weekDayString === "Tues") {
          numsARR = [0, 1, 2, 3, 4, 5];
        } else if (weekDayString === "Wed") {
          numsARR = [0, 1, 2, 3, 4];
        } else if (weekDayString === "Thurs") {
          numsARR = [0, 1, 2, 3];
        } else if (weekDayString === "Fri") {
          numsARR = [0, 1, 2];
        } else if (weekDayString === "Sat") {
          numsARR = [0, 1];
        }
        numsARR.forEach(num => {
          today.setDate(dayINT + num);
          let weekString = today.toDateString();
          dueDateList.push(weekString);
        });
      }
      fuse.list.forEach(task => {
        let due_date = task.due_date;
        if (dueDateList.includes(due_date)) {
          taskList.push(task);
        }
      });
      return taskList;
    }

    const result =
      input === "trash" ? fuse.list : fuse.search(input)[0]["tasks"];
    return result;
  }
```

## Team

- Paul Kil Woung Choi
- Mac Scheer
- Cameron Farina
- Anthony Chan

[1]: http://forgetful-task-management.herokuapp.com/
