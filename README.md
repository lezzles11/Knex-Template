# Knex, Postgres, Node, Express, Handlebars Template :rocket:

## Purpose :dark_sunglasses:

The purpose of this repository is to have a postgres/knex example to reference to later.

### User Stories :telescope:

1. Users will be able to look through the various examples and understand how the knex / postgres query works.

## Sprint :athletic_shoe:

| Done? | Component | Priority | Estimated Time | Actual Time |
| ----- | --------- | :------: | :------------: | :---------: |
|       | Checklist |    H     |    30 mins     |   30mins    |
|       |           |    M     |    30 mins     |   10mins    |
|       |           |    M     |    30 mins     |   15 mins   |

### Daily Stand Up :hourglass:

## Issues and Resolutions :flashlight:

**ERROR**: :gear:
**RESOLUTION**: :key:

| Issue                | Where it occurs | Possible solution | Actual solution |
| -------------------- | :-------------: | :---------------: | :-------------: |
| Creating a checklist |        H        |       2hrs        |     2.5hrs      |

#### Code Snippets

- [ ] Knex: One to many relationship

##### ONE TO MANY RELATIONSHIP

###### classes

id | primary key ()
name | string

###### teachers

id | primary key
name | string
class_id | foreign key (references table below )

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

id | primary key
name | string
class_id | foreign key (references table below )

###### students

id | primary key
name | string

###### students_subjects

id | primary key
foreign key | student_id
foreign key | subject_id

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

#### What is one thing that I learned from doing this project? :books:

#### Credits :recycle:

[Jest](https://jestjs.io/)

#### Contributing :round_pushpin:

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
Not sure how? Learn [Github](https://www.youtube.com/watch?v=3RjQznt-8kE&list=PL4cUxeGkcC9goXbgTDQ0n_4TBzOO0ocPR)
Please make sure to update tests as appropriate.

#### License :memo:

[MIT](https://choosealicense.com/licenses/mit/)
