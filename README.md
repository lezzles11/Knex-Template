# Knex, Postgres, Node, Express, Handlebars Template :rocket:

## Purpose :dark_sunglasses:

The purpose of this repository is to have a postgres/knex example to reference to later.

### Important things to remember about knex :hourglass:

- [ ] Knex: One to many relationship
- [ ] use .unique(), .foreign() and .references()
- [ ] The reason why you want to use table.increment() for id is to prevent messy data handling later
- [ ] Never delete existing migration files!
- [ ] To start

```
npm install knex
knex init
```

- [ ] Make a migration

```
knex migrate:make <tablename>
```

- [ ] Generate tables

```
knex migrate:latest
```

- [ ] To rollback (control + z)

```
knex migrate:rollback
```

- [ ] Create seed file

```
knex seed:make seed-users
```

- [ ] Run seed file

```
knex seed:run
```

### User Stories :telescope:

1. Users will be able to look through the various examples and understand how the knex / postgres query works.

## Vocab

| Word      | Where it occurs  |
| --------- | :--------------: |
| Migration |   Create data    |
| Seed      | Insert fake data |

## Sprint :athletic_shoe:

| Done? | Component                                                                   | Priority | Estimated Time | Actual Time |
| ----- | --------------------------------------------------------------------------- | :------: | :------------: | :---------: |
| x     | Checklist                                                                   |    H     |    30 mins     |   30mins    |
| x     | Design Table First (create ERD diagram)                                     |    M     |    30 mins     |   10mins    |
| x     | Use foreign keys                                                            |    M     |    30 mins     |   15 mins   |
| x     | Normalize your data (teachers table should not contain info about students) |    M     |    30 mins     |   15 mins   |
| x     | Don't hesitate to change table structure                                    |    M     |    30 mins     |   15 mins   |
| x     | Don't create tables too early                                               |    M     |    30 mins     |   15 mins   |
| x     | Design code around data                                                     |    M     |    30 mins     |   15 mins   |
|       | CREATE users table                                                          |    M     |    30 mins     |   15 mins   |
|       | CREATE notes table                                                          |    M     |    30 mins     |   15 mins   |
|       | GET data from user table                                                    |    M     |    30 mins     |   15 mins   |
|       | GET data from notes table                                                   |    M     |    30 mins     |   15 mins   |
|       | POST data from user table                                                   |    M     |    30 mins     |   15 mins   |
|       | POST data from notes table                                                  |    M     |    30 mins     |   15 mins   |
|       | PUT (edit) data from user table                                             |    M     |    30 mins     |   15 mins   |
|       | PUT (edit)data from notes table                                             |    M     |    30 mins     |   15 mins   |
|       | Delete data from user table                                                 |    M     |    30 mins     |   15 mins   |
|       | Delete data from notes table                                                |    M     |    30 mins     |   15 mins   |
|       |                                                                             |    M     |    30 mins     |   15 mins   |

### ERD Table

![UML](https://www.dropbox.com/s/cwsgbxtlhurkgux/_ERD%20with%20colored%20entities%20example%20%28UML%20notation%29.png?raw=1)

## Issues and Resolutions :flashlight:

**ERROR**: :gear:
**RESOLUTION**: :key:

| Issue                | Where it occurs | Possible solution | Actual solution |
| -------------------- | :-------------: | :---------------: | :-------------: |
| Creating a checklist |        H        |       2hrs        |     2.5hrs      |

#### Code Snippets

##### ONE TO MANY RELATIONSHIP

###### classes

- id | primary key ()
- name | string

###### teachers

- id | primary key
- name | string
- class_id | foreign key (references table below )

```
// Classes Table
exports.up = function (knex, Promise) {
  return knex.schema.createTable("classes", (table) => {
    table.increments();
    table.string("name");
    table.string("classroom");
    table.string("period");
    table.timestamps(false, true);
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable("classes");
};
// Teachers Table
exports.up = function (knex, Promise) {
  return knex.schema.createTable("teachers", (table) => {
    table.increments();
    table.string("name");
    // The unique is necessary to guarantee it is a one-to-one relation.
    table.integer("class_id").unsigned().unique();
    // foreign id is referenced here
    table.foreign("class_id").references("classes.id");
    table.timestamps(false, true);
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable("teachers");
};

```

##### MANY TO MANY RELATIONSHIP

###### subjects

- id | primary key
- name | string
- class_id | foreign key (references table below )

###### students

- id | primary key
- name | string

###### students_subjects

- id | primary key
- foreign key | student_id
- foreign key | subject_id

```
exports.up = function(knex,Promise){
    // Create table subjects
    return knex.schema.createTable("subjects",(subjects)=>
        subjects.increments();
        subjects.string("name");
        subjects.timestamps(false,true);
    }).then(()=>{
        // Then create table students_subjects
        return knex.schema.createTable("students_subjects",(studentsSubjects)=>{
            studentsSubjects.increments();
            studentsSubjects.integer("student_id").unsigned();
            studentsSubjects.foreign("student_id").references("students.id");
            studentsSubjects.integer("subject_id").unsigned();
            studentsSubjects.foreign("subject_id").references("subjects.id");
        });
    });
}

exports.down = function(knex,Promise){
    return knex.schema.dropTable('students_subjects')
            .then(()=>knex.schema.dropTable('subjects'));
}
```

#### Insert Seed Data

```
exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  returnknex("table_name")
    .del()
    .then(function () {
      // Inserts seed entries
      returnknex("table_name").insert([
        { colName: "rowValue1" },
        { colName: "rowValue2" },
        { colName: "rowValue3" },
      ]);
    });
};


```

#### What is one thing that I learned from doing this project? :books:

#### Credits :recycle:

[Jest](https://jestjs.io/)

#### Contributing :round_pushpin:

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
Not sure how? Learn [Github](https://www.youtube.com/watch?v=3RjQznt-8kE&list=PL4cUxeGkcC9goXbgTDQ0n_4TBzOO0ocPR)
Please make sure to update tests as appropriate.

#### License :memo:

[MIT](https://choosealicense.com/licenses/mit/)
