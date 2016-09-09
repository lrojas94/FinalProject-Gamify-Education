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

import passport from './passport';
import queryHelpers from './queryHelpers';

module.exports = ({ model, url, modelName, resultObjectName, attributes }) => {
  resultObjectName = resultObjectName || _.camelCase(modelName);

  var router = express.Router();
  router.use(passport.authenticate('jwt', { session: false }));


  router.get('/', (req: any, res: any) => {

    queryHelpers.tableQuery({
      req: req,
      model: model,
      url: url,
      attributes: attributes,
      searchAttributes: null,
      include: null,
      includeInSearchQuery: null,
      includeInWhere: null
    })
    .then((result) => {
      return res.json(result);
    })
    .catch((err) => {
      console.log(err);
      return res.json({
        status: 'error',
        message: `There was an error querying for ${modelName}.`
      });
    });
  });

  router.get('/:id', (req, res) => {

    model.findOne({
      where: {
        id: req.params.id
      },
    })
    .then((data) => {
      res.json({
        status: 'success',
        [resultObjectName]: data
      });
    })
    .catch((err) => {
      console.log(err);
      res.json({
        status: 'error',
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
  var upsertModel = ({req,  path,  transaction}) => {

    return queryHelpers.upsert({
      req: req,
      attributes: attributes,
      path: path,
      model: model,
      transaction: transaction,
      data: null,
      checkForId: null
    });
  };


  router.post('/', (req: any, res) => {
    upsertModel({
      req,
      path: null,
      transaction: null
    })
    .then((data) => {
      return res.json({
        status: 'sucess',
        message: `${modelName} was successfuly added to our servers.`,
        [resultObjectName]: data
      });
    })
    .catch((err) => {
      return res.json({
        status: 'error',
        message: `${modelName} could not be created.`,
        // errorData: errorsHelper(err),
        errorCode: null
      });
    });

  });

  router.put('/:id', (req, res) => {

    req.body.id = req.params.id;
    upsertModel({
      req,
      path: null,
      transaction: null
    })
    .then((data) => {
      return res.json({
        status: 'sucess',
        message: `${modelName} was successfuly added to our servers.`,
        [resultObjectName]: data
      });
    })
    .catch((err) => {
      return res.json({
        status: 'error',
        message: `${modelName} could not be created.`,
        // errorData: errorsHelper(err),
        errorCode: null
      });
    });
  });

  router.delete('/:id', (req, res) => {
    if (req.params.id === 'undefined' || req.params.id === '') {
      res.json({
        status: 'error',
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
        status: 'success',
        message: `${modelName} was deleted successfuly`
      });
    })
    .catch((err) => {
      res.json({
        status: 'error',
        message: 'It seems like something happened while trying to delete this address. Maybe it did not exist, but there\'s a chance it was our fault. Please check again later.',
        // errorData: errorsHelper(err)
      });
    });

  });


  return {
    router,
    [`upsert${modelName}`]: upsertModel
  };
};
