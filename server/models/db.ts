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
    // logging: false

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
    foreignKey: 'studentId',
    constraints: false
  });

  Student.belongsTo(Group, {
    as: 'group'
  });
};

function createTeacherRelations() {
  Teacher.belongsTo(Person, {
    as: 'person',
    onDelete: 'CASCADE'
  });

  Teacher.hasMany(Group, {
    as: 'groups',
    foreignKey: 'teacherId',
    constraints: false
  });

  Teacher.belongsTo(School, {
    as: 'school'
  });

  Teacher.hasMany(Problem, {
    as: 'problems',
    foreignKey: 'teacherId',
    constraints: false
  });
};

function createProblemRelations() {
  Problem.hasMany(Solution, {
    as: 'solutions',
    foreignKey: 'problemId',
    constraints: false
  });

  Problem.hasMany(Answer, {
    as: 'answers',
    foreignKey: 'problemId',
    constraints: false
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
    },
    constraints: false
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
    foreignKey: 'solutionId',
    constraints: false
  });
};

function createGroupRelations() {
  Group.hasMany(Student, {
    as: 'students',
    foreignKey: 'groupId',
    constraints: false
  });

  Group.belongsTo(School, {
    as: 'school'
  });

  Group.belongsTo(Teacher, {
    as: 'teacher'
  });

  Group.hasMany(Topic, {
    as: 'topics',
    foreignKey: 'groupId',
    constraints: false
  });

  Group.hasMany(Difficulty, {
    as: 'difficulties',
    foreignKey: 'groupId',
    constraints: false
  });

}

function createSchoolRelations() {
  School.hasMany(Group, {
    foreignKey: 'schoolId',
    as: 'groups',
    constraints: false
  });

  School.hasMany(Teacher, {
    as: 'teachers',
    foreignKey: 'schoolId',
    constraints: false
  });
}

function createTopicRelations() {
  Topic.hasMany(Problem, {
    as: 'problems',
    foreignKey: 'topicId',
    constraints: false
  });

  Topic.hasMany(Achievement, {
    as: 'achievements',
    foreignKey: 'topicId',
    constraints: false
  });

  Topic.belongsTo(Group, {
    as: 'group'
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
    foreignKey: 'difficultyId',
    constraints: false
  });

  Difficulty.belongsTo(Group, {
    as: 'group',
  });
}

export function syncAll() {
  // in order to force, before running NPM start just write: export FORCED=true;
  if (!initialized) {
    initialize();
  }
  let force = false; // do not ever force again.
  var promise = new Promise((resolve, reject) => {
    Person.sync({force})
    .then(() => School.sync({force})
    .then(() => Topic.sync({force})
    .then(() => Group.sync({force})
    .then(() => Teacher.sync({force})
    .then(() => {
      // Create admin user:
        Teacher.findOne({
          where: {
            username: 'admin'
          }
        })
        .then((teacher) => {
          console.log(teacher);
          if (!teacher) {
            return DB.transaction((t) => {
              return Person.create({
                name: 'Admin',
                lastName: 'Admin',
                gender: 'm',
                birthDay: new Date()
              }, { transaction: t })
              .then((person) => {
                return Teacher.create({
                  username: 'admin',
                  password: 'admin',
                  degree: 'Master in All',
                  personId: null
                }, {
                  transaction: t
                })
                .then((teacher) => {
                  return teacher['setPerson'](person, { transaction: t });
                })
                .catch((err) => { console.log(err); });

              })
              .catch((err) => {
                console.log(err);
              });
            });
          }
      });

      Student.sync({force})
      .then(() => Difficulty.sync({force})
      .then(() => Problem.sync({force})
      .then(() => Solution.sync({force})
      .then(() => Achievement.sync({force})
      .then(() => Answer.sync({force})
      .then(() => resolve()))))));
    }
      // These have no dependency, so they can be created all together.
    )))))
    .catch(e => reject(e));
  });

  return promise;

}


initialize();
