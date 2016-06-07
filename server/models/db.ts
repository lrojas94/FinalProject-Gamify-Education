import * as Sequelize from 'sequelize';
import * as UserDef from './users';
import {constants} from './../constants';

export var initialized: Boolean = false;

export var User: UserDef.Model;

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
    }

  });
  this.User = <UserDef.Model> UserDef.define(sequelize);

  this.initialized = true;
};
