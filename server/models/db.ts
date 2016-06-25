import * as Sequelize from 'sequelize';
import * as PersonDB from './person';
import * as TeacherDB from './teacher';
import * as StudentDB from './student';
import * as SchoolDB from './school';
import * as GroupDB from './group';
import {constants} from './../constants';

export var initialized: Boolean = false;
export var Person: PersonDB.Model;
export var Teacher: TeacherDB.Model;
export var Student: StudentDB.Model;
export var School: SchoolDB.Model;
export var Group: GroupDB.Model;

export function initialize(): void {
    if (this.initialized) {
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

  });
  Person = <PersonDB.Model> PersonDB.define(sequelize);
  Teacher = <TeacherDB.Model> TeacherDB.define(sequelize);
  Student = <StudentDB.Model> StudentDB.define(sequelize);
    this.Person  = <PersonDB.Model> PersonDB.define(sequelize);
    this.Teacher = <TeacherDB.Model> TeacherDB.define(sequelize);
    this.School  = <SchoolDB.Model> SchoolDB.define(sequelize);
    this.Group   = <GroupDB.Model> GroupDB.define(sequelize);

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
