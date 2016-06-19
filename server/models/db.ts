import * as Sequelize from 'sequelize';
import * as PersonDB from './person';
import * as TeacherDB from './teacher';
import {constants} from './../constants';

export var initialized: Boolean = false;
export var Person: PersonDB.Model;
export var Teacher: TeacherDB.Model;


export function initialize(): void {
  if (this.initialized) {
    return;
  }

  var sequelize = new Sequelize(constants.DATABASE_NAME, constants.DATABASE_USERNAME, constants.DATABASE_PASSWORD, {
    host: constants.DATABASE_HOST,
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

  // Think of it this way: The title of "Teacher" belongs to a Person
  Teacher.belongsTo(Person, {
    as: 'person',
    onDelete: 'CASCADE'
  });

  initialized = true;
};
