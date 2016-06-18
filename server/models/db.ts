import * as Sequelize from 'sequelize';
import * as PersonDB from './person';
import {constants} from './../constants';

export var initialized: Boolean = false;
export var Person: PersonDB.Model;

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

  initialized = true;
};
