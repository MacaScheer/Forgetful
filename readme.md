# Forgetful

Forgetful lets people keep track of daily/weekly tasks.

# Background and Overview

Forgetful is a minimal viable product that tackles three challenges in application development, software engineering, and user experience.

Primarily built with the combination of following technologies:

- MongoDB
- GraphQL
- Apollo
- React
- Node

# Functionality and MVP

- Task CRUD
- Lists
- List Summary
- Search

**TBD**

# Technologies and Technical Challenges

### Site Map

- Auth
  - Register
  - Login
  - Logout
- Feed

  - Tasks
  - Lists
  - Tags

- Show - Task
- Index - Tasks
- Index - Tags

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

Backend:

- Mongodb
- Nodejs
- GraphL
- Express

Frontend:

- React
- Apollo

DevOps:

- Docker

# Group Members and Work Plan Breakdown

## Team

- Anthony Chan
- Cameron Farina
- Mac Scheer
- Paul Kil Woung Choi

## Plan

- Day 1

  - Session Auth API Setup
  - Schema, Types, Models, Queries, Mutations
  - Mongodb Setup

- Day 2

* Day 3

- Day 4

* Day 5
