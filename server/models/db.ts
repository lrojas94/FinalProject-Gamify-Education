import * as Sequelize from 'sequelize';
import * as PersonDB from './person';
import * as TeacherDB from './teacher';
import * as StudentDB from './student';
import * as ProblemDB from './problem';
import * as SolutionDB from './solution';
import * as AnswerDB from './answer';
import {constants} from './../constants';

export var initialized: Boolean = false;
export var Person: PersonDB.Model;
export var Teacher: TeacherDB.Model;
export var Student: StudentDB.Model;
export var Problem: ProblemDB.Model;
export var Solution: SolutionDB.Model;
export var Answer: AnswerDB.Model;
export var DB: Sequelize.Sequelize;


export function initialize(): void {
  if (initialized) {
    return;
  }

  DB = new Sequelize(constants.DATABASE_NAME, constants.DATABASE_USERNAME, constants.DATABASE_PASSWORD, {
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
  Person = <PersonDB.Model> PersonDB.define(DB);
  Teacher = <TeacherDB.Model> TeacherDB.define(DB);
  Student = <StudentDB.Model> StudentDB.define(DB);
  Problem = <ProblemDB.Model> ProblemDB.define(DB);
  Solution = <SolutionDB.Model> SolutionDB.define(DB);
  Answer = <AnswerDB.Model> AnswerDB.define(DB);
  // Think of it this way: The title of "Teacher" belongs to a Person
  Teacher.belongsTo(Person, {
    as: 'person',
    onDelete: 'CASCADE'
  });

  Student.belongsTo(Person, {
      as: 'person',
      onDelete: 'CASCADE'
  });

  Solution.belongsTo(Problem, {
    as: 'problem',
    onDelete: 'CASCADE',
  });

  Answer.belongsTo(Solution, {
    as: 'solution'
  });

  Answer.belongsTo(Problem, {
    as: 'problem'
  });

  Answer.belongsTo(Student, {
    as: 'student'
  });

  Problem.hasMany(Solution, {
    as: 'solutions',
    foreignKey: 'problemId'
  });

  Problem.hasMany(Answer, {
    as: 'answers',
    foreignKey: 'problemId'
  });

  Solution.hasMany(Answer, {
    as: 'answers',
    foreignKey: 'solutionId'
  });

  Student.hasMany(Answer, {
    as: 'answers',
    foreignKey: 'studentId'
  }); // Not setup on POJO though.

  initialized = true;
};

export function syncAll() {
  Person.sync();
  Teacher.sync();
  Student.sync();
  Problem.sync();
  Solution.sync();
  Answer.sync();
}


initialize();
