/**
 * This simple router provides basic API CRUD.
 * It allows to insert other items related to other routers too, given that right parameters are provided,
 * and the request body contains those values.
 *
 * This router provides:
 * 		- Table query (Get by page)
 * 		- Get/View single
 * 		- Create.
 * 		- Update
 * 		- Delete
 *
 * @author: Luis E. Rojas Cabrera (2016)
 */

import * as _ from 'lodash';
import * as express from 'express';
import * as jwt from 'jsonwebtoken';
import passport from './passport';
import queryHelpers from './queryHelpers';
import { DB } from './../models/db';
import { ITableQuery } from './queryHelpers';

export interface ISimpleRouter {
  model: any;
  url: string;
  modelName: string;
  resultObjectName?: string;
  attributes: string[];
  opts?: ISimpleRouterOpts;
}

export interface ISimpleRouterOpts {
  list?: ITableQuery;
  upsert?: {
    include: {
      bodyPath: string,
      upsert: (data: IUpsert) =>  Promise<any>,
      isAssociation?: boolean,
      associationName?: string,
      onUpsert?: (data: any, transaction?) => Promise<any>
    }[];
    onUpsert?: (data: any, transaction?) => Promise<any>
  };
  view?: {
    include: {
      model: any;
      as?: string
    }[]
  };
  options?: {
    attributes?: string[]
  };
  middlewares?: {
    list?: (req: any, res: any, next: Function) => any;
    get?: (req: any, res: any, next: Function) => any;
    create?: (req: any, res: any, next: Function) => any;
    update?: (req: any, res: any, next: Function) => any;
    delete?: (req: any, res: any, next: Function) => any;
  };
}

export interface IUpsert {
  req: any;
  path?: string;
  transaction?: any;
  data?: any;
};

export default ({ model, url, modelName, resultObjectName, attributes, opts }: ISimpleRouter ) => {
  resultObjectName = resultObjectName || _.camelCase(modelName);
  opts.middlewares = opts.middlewares || {};

  var router = express.Router();

  if (opts.middlewares.list) {
    router.use('/', opts.middlewares.list);
  }

  router.get('/', (req: any, res: any) => {

    queryHelpers.tableQuery({
      req: req,
      model: model,
      url: url,
      attributes: opts.list.attributes || attributes,
      searchAttributes: opts.list.searchAttributes,
      include: opts.list.include,
      includeInSearchQuery: opts.list.includeInSearchQuery,
      includeInWhere: opts.list.includeInWhere
    })
    .then((result) => {
      return res.json(result);
    })
    .catch((err) => {
      console.log(err);
      return res.json({
        status: 1,
        message: `There was an error querying for ${modelName}.`
      });
    });
  });


  if (opts.middlewares.get) {
    router.use('/:id(\\d+)', opts.middlewares.get);
  }
  router.get('/:id(\\d+)', (req, res) => {

    if (req['result']) {
        return res.json({
            status: 0,
            [resultObjectName]: req['result']
        });
    }

    model.findOne({
      where: {
        id: req.params.id
      },
      include: opts.view ? opts.view.include : []
    })
    .then((data) => {
      res.json({
        status: 0,
        [resultObjectName]: data
      });
    })
    .catch((err) => {
      console.log(err);
      res.json({
        status: 1,
        message: `${modelName} not found.`
      });
    });
  });


  /**
   * Creates or updates an address depending on parameters.
   * @param  {[type]} req       Express Request.
   * @param  {[type]} onSuccess Function to call on Success
   * @return {[type]}           Model object.
   */
  var upsertModel = ({req,  path,  transaction, data  }: IUpsert): Promise<any> => {
    /**
     * TODO: Create transaction when expecting to use includes.
     * @type {[type]}
     */
    path = path || resultObjectName;
    return new Promise((resolve, reject) => {
      return queryHelpers.upsert({
        req: req,
        attributes: attributes,
        path: path,
        model: model,
        transaction: transaction,
        data: null,
      })
      .then((data) => {
        if (!opts.upsert) {
          resolve(data);
        }
        /**
         * Makes sure to insert/update all includes included in UPSERT as well as set
         * relationships with them if required to do so.
         * @type {[type]}
         */
        var addIncludes = (data) =>  {
          var promises = [];
          if (opts.upsert.include) {
            _.forEach(opts.upsert.include, (include) => {
              if (req.body[include.bodyPath]) {
                // check if that was actually included:
                promises.push(new Promise((resolve, reject) => {
                  include.upsert({
                    req,
                    path: include.bodyPath,
                    transaction: transaction
                  })
                  .then((newUpsertData) => {
                    if (include.isAssociation) {
                      data[`set${include.associationName}${_.isArray(newUpsertData) ? 's' : ''}`](newUpsertData, { transaction: transaction })
                      .then(() => {
                        return resolve(data);
                      })
                      .catch((err) => {
                        console.log(err);
                        return reject(err);
                      });
                    }
                    else {
                      return resolve(newUpsertData);
                    }
                  })
                  .catch((err) => reject(err));
                }));
              }
            });
            return Promise.all(promises);
          }
          else {
            return new Promise((resolve, reject) => { resolve(); });
          }
        };

        if (opts.upsert.include) {
          return addIncludes(data)
          .then((something) => {
            if (opts.upsert.onUpsert) {
              return opts.upsert.onUpsert(data, transaction)
              .then(() => {
                return resolve(data);
              })
              .catch((err) => {
                return reject(err);
              });
            }
            else {
              return resolve(data);
            }
          })
          .catch((err) => {
            return reject(err);
          });
        }
        else if (opts.upsert.onUpsert) {
          return opts.upsert.onUpsert(data, transaction)
          .then(() => {
            return resolve(data);
          })
          .catch((err) => {
            return reject(err);
          });
        }
        else {
          return resolve(data);
        }
      })
      .catch((err) => {
        return reject(err);
      });
    });
  };

  if (opts.middlewares.create) {
    router.use('/', opts.middlewares.create);
  }
  router.post('/', (req: any, res) => {
    DB.transaction((t) => {
      return upsertModel({
        req,
        path: resultObjectName,
        transaction: t
      });
    })
    .then((data) => {
      return res.json({
        status: 0,
        message: `${modelName} was successfuly added to our servers.`,
        [resultObjectName]: data
      });
    })
    .catch((err) => {
      if (err.message === 'Transaction cannot be committed because it has been finished with state: commit') {
        return res.json({
          status: 0,
          message: `${modelName} was successfuly added to our servers.`,
        });
      }

      return res.json({
        status: 1,
        message: `${modelName} could not be created.`,
        // errorData: errorsHelper(err),
        errorCode: null
      });
    });

  });

  if (opts.middlewares.update) {
    router.use('/:id', opts.middlewares.update);
  }

  router.put('/:id', (req, res) => {
    DB.transaction((t) => {
      return upsertModel({
        req,
        path: resultObjectName,
        transaction: t
      })
      .then((data) => {
        return res.json({
          status: 0,
          message: `${modelName} was successfuly added to our servers.`,
          [resultObjectName]: data
        });
      })
      .catch((err) => {
        return res.json({
          status: 1,
          message: `${modelName} could not be updated.`,
          // errorData: errorsHelper(err),
          errorCode: null
        });
      });
    });
  });

  if (opts.middlewares.delete) {
    router.use('/:id', opts.middlewares.delete);
  }
  router.delete('/:id', (req, res) => {
    if (req.params.id === 'undefined' || req.params.id === '') {
      res.json({
        status: 1,
        message: `No ${modelName} was provided to be deleted.`
      });
      return;
    }

    model.destroy({
      where: {
        id: req.params.id
      }
    })
    .then(() => {
      res.json({
        status: 0,
        message: `${modelName} was deleted successfuly`
      });
    })
    .catch((err) => {
      console.log(err);
      res.json({
        status: 1,
        message: 'It seems like something happened while trying to delete this address. Maybe it did not exist, but there\'s a chance it was our fault. Please check again later.',
        // errorData: errorsHelper(err)
      });
    });

  });

  router.get('/options', (req, res) => {
    queryHelpers.selectQuery({
      req,
      attributes: opts.options ? opts.options.attributes : [],
      model: model
    })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
      res.json({
        status: 'error',
        message: `There was an error querying for ${modelName} options`,
        errorData: err
      });
    });
  });


  return {
    router,
    upsert: upsertModel
  };
};
