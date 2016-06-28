import * as Sequelize from 'sequelize';
import * as PersonDB from './person';
import * as TeacherDB from './teacher';
import * as StudentDB from './student';
import {constants} from './../constants';

export var initialized: Boolean = false;
export var Person: PersonDB.Model;
export var Teacher: TeacherDB.Model;
export var Student: StudentDB.Model;


export function initialize(): void {
  if (initialized) {
    return;
  }

  var sequelize = new Sequelize(constants.DATABASE_NAME, constants.DATABASE_USERNAME, constants.DATABASE_PASSWORD, {
    host: constants.DATABASE_HOST,
    port: constants.DATABASE_PORT,
    dialect: 'postgres',
    pool: {
      maxConnections: 100,
      minConnections: 0,
      maxIdleTime: 10000
    },
    logging: false

  });
  Person = <PersonDB.Model> PersonDB.define(sequelize);
  Teacher = <TeacherDB.Model> TeacherDB.define(sequelize);
  Student = <StudentDB.Model> StudentDB.define(sequelize);

  // Think of it this way: The title of "Teacher" belongs to a Person
  Teacher.belongsTo(Person, {
    as: 'person',
    onDelete: 'CASCADE'
  });

  Student.belongsTo(Person, {
      as: 'person',
      onDelete: 'CASCADE'
  });

  initialized = true;
};


initialize();
