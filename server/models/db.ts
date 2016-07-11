import * as Sequelize from 'sequelize';
import * as PersonDB from './person';
import * as TeacherDB from './teacher';
import * as StudentDB from './student';
import * as SchoolDB from './school';
import * as GroupDB from './group';
import * as ProblemDB from './problem';
import * as SolutionDB from './solution';
import * as AnswerDB from './answer';
import * as TopicDB from './topic';
import * as AchievementDB from './achievement';
import * as DifficultyDB from './difficulty';
import {constants} from './../constants';

export var initialized: Boolean = false;
export var Person: PersonDB.Model;
export var Teacher: TeacherDB.Model;
export var Student: StudentDB.Model;
export var School: SchoolDB.Model;
export var Group: GroupDB.Model;
export var Problem: ProblemDB.Model;
export var Solution: SolutionDB.Model;
export var Answer: AnswerDB.Model;
export var Topic: TopicDB.Model;
export var Achievement: AchievementDB.Model;
export var Difficulty: DifficultyDB.Model;
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
  School = <SchoolDB.Model> SchoolDB.define(DB);
  Group = <GroupDB.Model> GroupDB.define(DB);
  Topic = <TopicDB.Model> TopicDB.define(DB);
  Achievement = <AchievementDB.Model> AchievementDB.define(DB);
  Difficulty = <DifficultyDB.Model> DifficultyDB.define(DB);

  createStudentRelations();
  createTeacherRelations();
  createAnswerRelations();
  createProblemRelations();
  createSolutionRelations();
  createGroupRelations();
  createSchoolRelations();
  createTopicRelations();
  createAchievementRelations();
  createDifficultyRelations();

  initialized = true;
};

function createStudentRelations() {
  Student.belongsTo(Person, {
      as: 'person',
      onDelete: 'CASCADE'
  });

  Student.hasMany(Answer, {
    as: 'answers',
    foreignKey: 'studentId'
  });

  Student.belongsTo(Group, {
    as: 'group'
  });

  Student.belongsTo(School, {
    as: 'school'
  });
};

function createTeacherRelations() {
  Teacher.belongsTo(Person, {
    as: 'person',
    onDelete: 'CASCADE'
  });

  Teacher.hasMany(Group, {
    as: 'groups',
    foreignKey: 'teacherId'
  });

  Teacher.belongsTo(School, {
    as: 'school'
  });

  Teacher.hasMany(Problem, {
    as: 'problems',
    foreignKey: 'teacherId'
  });
};

function createProblemRelations() {
  Problem.hasMany(Solution, {
    as: 'solutions',
    foreignKey: 'problemId'
  });

  Problem.hasMany(Answer, {
    as: 'answers',
    foreignKey: 'problemId'
  });

  Problem.belongsTo(Teacher, {
    as: 'teacher'
  });

  Problem.belongsTo(Group, {
    as: 'group'
  });

  Problem.belongsTo(Topic, {
    as: 'topic'
  });

  Problem.hasMany(Solution, {
    as: 'correctSolutions',
    foreignKey: 'problemId',
    scope: {
      isCorrect: true
    }
  });

  Problem.belongsTo(Difficulty, {
    as: 'difficulty'
  });
};

function createAnswerRelations() {
  Answer.belongsTo(Solution, {
    as: 'solution'
  });

  Answer.belongsTo(Problem, {
    as: 'problem'
  });

  Answer.belongsTo(Student, {
    as: 'student'
  });
};

function createSolutionRelations() {
  Solution.belongsTo(Problem, {
    as: 'problem',
    onDelete: 'CASCADE',
  });

  Solution.hasMany(Answer, {
    as: 'answers',
    foreignKey: 'solutionId'
  });
};

function createGroupRelations() {
  Group.hasMany(Student, {
    as: 'students',
    foreignKey: 'studentId'
  });

  Group.belongsTo(School, {
    as: 'school',
    foreignKey: 'schoolId'
  });

  Group.hasOne(Teacher, {
    as: 'teacher',
    foreignKey: 'teacherId'
  });
}

function createSchoolRelations() {
  School.hasMany(Group, {
    foreignKey: 'schoolId',
    as: 'groups'
  });

  School.hasMany(Teacher, {
    as: 'teachers',
    foreignKey: 'schoolId'
  });

  School.hasMany(Student, {
    as: 'students',
    foreignKey: 'schoolId'
  });
}

function createTopicRelations() {
  Topic.hasMany(Problem, {
    as: 'problems',
    foreignKey: 'topicId'
  });

  Topic.hasMany(Achievement, {
    as: 'achievements',
    foreignKey: 'topicId'
  });
}

function createAchievementRelations() {
  Achievement.belongsTo(Topic, {
    as: 'topic'
  });
}

function createDifficultyRelations() {
  Difficulty.hasMany(Problem, {
    as: 'problems',
    foreignKey: 'difficultyId'
  });
}

export function syncAll() {
  Person.sync();
  Teacher.sync();
  Student.sync();
  Problem.sync();
  Solution.sync();
  Answer.sync();
  School.sync();
  Group.sync();
  Topic.sync();
}


initialize();
