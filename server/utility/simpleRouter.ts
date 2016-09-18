/**
 * This simple router provides basic API CRUD.
 * It should be used for models with no dependencies (Addresses, phones, etc...).
 *
 * Do NOT use this router when a model has or could use some dependencies as it would not
 * be of help there.
 *
 * This router provides:
 * 		- Table query (Get by page - no search allowed)
 * 		- Get/View single
 * 		- Create.
 * 		- Update
 * 		- Delete
 */

import * as _ from 'lodash';
import * as express from 'express';
import * as jwt from 'jsonwebtoken';
import * as Sequelize from 'sequelize';
import passport from './passport';
import queryHelpers from './queryHelpers';
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
      onUpsert?: (data: any) => Promise<any>
    }[];
    onUpsert?: (data: any) => Promise<any>
  };
  view?: {
    include: {
      model: any;
      as?: string
    }[]
  };
}

export interface IUpsert {
  req: any;
  path?: string;
  transaction?: any;
};

export default ({ model, url, modelName, resultObjectName, attributes, opts }: ISimpleRouter ) => {
  resultObjectName = resultObjectName || _.camelCase(modelName);

  var router = express.Router();


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

  router.get('/:id', (req, res) => {

    model.findOne({
      where: {
        id: req.params.id
      },
      include: opts.view.include
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
  var upsertModel = ({req,  path,  transaction}: IUpsert): Promise<any> => {
    /**
     * TODO: Create transaction when expecting to use includes.
     * @type {[type]}
     */
    path = path || resultObjectName;
    return new Promise((resolve, reject) => {
      queryHelpers.upsert({
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
              promises.push(new Promise((resolve, reject) => {
                include.upsert({
                  req,
                  path: include.bodyPath
                })
                .then((newUpsertData) => {
                  console.log('NEW UPSERT DATA!!');
                  if (include.isAssociation) {
                    console.log('IS ASSOC!!!!');
                    data[`set${include.associationName}`](newUpsertData, { transaction: transaction })
                    .then(() => {
                      console.log('I just set *-*');
                      resolve(data);
                    })
                    .catch((err) => {
                      console.log('THERE WAS AN ERR T.T');
                      console.log(err);
                      reject(err);
                    });
                  }
                  else {
                    resolve(newUpsertData);
                  }
                });
              }));
            });
          }
          return Promise.all(promises);
        };

        if (opts.upsert.onUpsert) {
          opts.upsert.onUpsert(data)
          .then(() => {
            if (opts.upsert.include) {
              addIncludes(data)
              .then(() => {
                resolve(data);
              })
              .catch((err) => {
                reject(err);
              });
            }
          });
        }
        else if (opts.upsert.include) {
          addIncludes(data)
          .then(() => {
            resolve(data);
          })
          .catch((err) => {
            reject(err);
          });
        }
        else {
          resolve(data);
        }
      })
      .catch((err) => {
        reject(err);
      });
    });
  };


  router.post('/', (req: any, res) => {
    upsertModel({
      req,
      path: resultObjectName,
      transaction: null
    })
    .then((data) => {
      return res.json({
        status: 0,
        message: `${modelName} was successfuly added to our servers.`,
        [resultObjectName]: data
      });
    })
    .catch((err) => {
      console.log(err);
      return res.json({
        status: 1,
        message: `${modelName} could not be created.`,
        // errorData: errorsHelper(err),
        errorCode: null
      });
    });

  });

  router.put('/:id', (req, res) => {

    upsertModel({
      req,
      path: resultObjectName,
      transaction: null
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
      res.json({
        status: 1,
        message: 'It seems like something happened while trying to delete this address. Maybe it did not exist, but there\'s a chance it was our fault. Please check again later.',
        // errorData: errorsHelper(err)
      });
    });

  });


  return {
    router,
    upsert: upsertModel
  };
};
