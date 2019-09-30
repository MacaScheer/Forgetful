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

Primarily built with the combination of following technologies:
MongoDB, GraphQL, Apollo, React, Node, Docker

### Apollo Client

```js
{
    entities: {
        users: {
                0: {
                    id: 0,
                    username: 'string',
                    tasks: [
                        task1: {},
                        task2: {},
                        task3: {}
                    ],
                    lists: [
                        list1: {}
                    ],
                    tags: [
                        tag1: {}
                    ]
                }
        },
        lists: {
            0: {
                id: 0,
                tasks: [
                        task1: {},
                        task2: {},
                        task3: {}
                    ]
                name: 'string',
            }
        },
        task: {
            0 : {
                id: 0,
                task_id: 1,
                author_id: 0,
                body: 'string',
                due_date: 'string',
                start_date: 'string',
                priority: 'string',
                repeat: 'string',
                location: 'string',
                tag: 'string',
                list_id: 'integer'
            }
        },
        tag: {
            0: {
                tag_name:,
                tag_id:,
                tasks: [
                    task1: {}
                    ]
            }
        }
    }
}
```

# Frontend Mutations

```

  CREATE_TASK: gql`
    mutation newTask(
      $name: String
      $due_date: String
      $start_date: String
      $locationId: String
      $tagId: String
      $listId: String
      $userId: String
    ) {
      newTask(
        name: $name
        due_date: $due_date
        start_date: $start_date
        locationId: $locationId
        tagId: $tagId
        listId: $listId
        userId: $userId
      ) {
        name
        _id
        due_date
        start_date

      }
    }
  `,
```

```
  FETCH_USER: gql`
    query FetchUser($Id: ID!) {
      user(_id: $Id) {
        tasks {
          _id
          name
          due_date
          start_date
        }
        tags {
          tasks {
            _id
            name
          }
          name
          _id
        }
        lists {
          name
          _id
          tasks {
            _id
            name
          }
        }

        trash{
          _id
          name
        }
        locations{
          _id

          name
          tasks{
            _id
            name
          }
        }
      }
    }
  `,
```

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

  runSearchResult(tasks) {
    let input = localStorage.getItem("userInput");
    const options = {
      keys: ["due_date", "body", "name"],
      shouldSort: true,
      tokenize: true,
      findAllMatches: true,
      threshold: 0.2,
      location: 0,
      distance: 100,
      maxPatternLength: 32,
      minMatchCharLength: 1
    };
    let fuse = new Fuse(tasks.tasks, options);
    let result = fuse.search(input);
    return result;
  }

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
