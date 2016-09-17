import * as _ from  'lodash';


export interface ITableQuery {
  req?: any;
  model: any;
  attributes: string[];
  searchAttributes?: any;
  url: string;
  include?: any;
  includeInSearchQuery?: any;
  includeInWhere?: any;
}


var queryHelper = {
  generateOr: (req, elements, forcedQuery?) => {
    if (!elements) {
      return [];
    }

    var or = [];
    _(elements).forEach((e) => {
      if (req.query[e] || forcedQuery) {
        or.push({
          [e]: {
            $like: `%${req.query[e] || forcedQuery}%`
          }
        });
      }
    });

    return or;
  },

  generateWhere: (req, elements) => {
    if (!elements) {
      return {};
    }

    var where = {};
    _(elements).forEach((e) => {
      if (req.query[e]) {
        where[e] = req.query[e];
      }
    });

    return where;
  },

  /**
   * Performs a query returning table data.
   * @param  {object} req              Express Request.
   * @param  {object} model            Sequelize Model
   * @param  {Array} attributes       List of attributes to include.
   * @param  {Array} searchAttributes List of attributes to search for.
   * @param  {Function} onSuccess        Function to be called when query is successfull
   * @param  {Function} onFailure        Function to be called on error.
   * @return {object}                  Query results
   */
  tableQuery: ({ req, model, attributes, searchAttributes, url, include, includeInSearchQuery, includeInWhere }: ITableQuery) => {
    var limit = req.query.limit && req.query.limit < 25 ? req.query.limit : 10;
    var page = req.query.page - 1 || 0;
    var or = queryHelper.generateOr(req, searchAttributes);
    var where = {};

    if (or.length !== 0) {
      where = {
        $or: or
      };
    }

    return new Promise((resolve, reject) => {
      where = _.merge(where, includeInWhere);
      includeInSearchQuery = includeInSearchQuery || {};
      model.findAndCountAll({
        attributes: attributes || true,
        offset: parseInt(`${page * limit}`),
        limit: parseInt(limit),
        where,
        include: include || []
      })
      .then((data) => {
        var nextPage = page * limit + limit > data.count ? 1 : page + 2;
        var result = {
          status: 0,
          data: data.rows,
          count: data.count,
          page: page + 1,
          nextPage: nextPage,
          searchQuery: _.merge(includeInSearchQuery, queryHelper.generateWhere(req, searchAttributes), { limit: req.query.limit || 10 })
        };
        resolve(result);
      })
      .catch((err) => {
        reject(err);
      });
    });
  },

  /**
   * selectQuery returns an object filled with [ text, id ]
   * attributes which can be used to fill up a select box.
   * @param  {object} {req        Express request.
   * @param  {object} model       Sequelize model
   * @param  {Array} attributes} Attributes to join from the model. Used to join things like firstName + lastName, and such.
   * @return {Promise}             Promise which reoslves in object mentioned in description.
   */
  selectQuery: ({req, model, attributes}) => {
    return new Promise((resolve, reject) => {
      var searchQuery = req.query.search;
      var or = [];
      var where = {};
      if (searchQuery) {
        or = queryHelper.generateOr(req, attributes, searchQuery);
      }

      if (or.length !== 0) {
        where = { $or: or };
      }

      model.findAll({
        attributes: ['id', ...attributes],
        where,
        limit: 10,
      })
      .then((data) => {
        data = _.map(data, (element: any) => {
          element = element.get();
          return {
            id: element['id'],
            text: _.reduce(attributes, (result, elem: any) => {
              return `${result} ${element[elem]}`;
            }, '')
          };
        });

        console.log(data);

        resolve({
          status: 0,
          data: data
        });
      })
      .catch((err) => {
        reject(err);
      });
    });
  },

  /**
   * A function to choose whether to update or insert and makes sure to return the object.
   * Default sequelize upsert fails at this, as it only returns a boolean (whether or not row was updated/inserted)
   *
   * This function would also allow to check before insertion, but that's gonne be optional.
   * @param  {Object} model         Sequelize model
   * @param  {Object} data          Data representing the model.
   * @return {Promise}      A promise which resolves into the result of insertion.
   */
  upsert({ model, data, attributes, path, req, transaction }: {
    model: any,
    data?: any,
    attributes: string[],
    path?: string,
    req: any, // Express router actually.
    transaction: any // Sequelize transaction
  }) {

    if (!data && attributes && req) {
      if (path) {
        data = _.chain(_.get(req.body, path)).pick(attributes).omit(_.isEmpty).omit(_.isNull).omit(_.isUndefined).value();
      }
      else {
        data = _.chain(req.body).pick(attributes).omit(_.isEmpty).omit(_.isNull).omit(_.isUndefined).value();
      }
    }

    return new Promise((resolve, reject) => {
      console.log(data);
      if (data.id) {
        // this is an update
        console.log('UPDATING-----------------------------------');
        model.findOne({
          where: {
            id: data.id
          }
        })
        .then((prevData) => {
          if (prevData == null) {
            return reject(new Error('Object was not found.'));
          }
          // it actually exists!!
          return prevData.update(data, { transaction: transaction })
          .then((result) => resolve(result))
          .catch((err) => reject(err));
        })
        .catch((err) => {
          // object probably doesnt exist, so:
          return reject(new Error('Object was not found.'));
        });
      }
      else {
        // this is a create
        //
        console.log('CREATING-----------------------------------');
        model.create(data, { transaction: transaction })
        .then((result) => {
          resolve(result);
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        });
      }
    });
  },
  /**
   * Allows to create an set an association to an instance.
   * @param  {Function} associationUpsert      function which inserts association in the datbase. [REQUIRED]
   * @param  {Function} instanceSetAssociation function which sets association in instance (generally instance.setAddress() and such) [REQUIRED]
   * @param  {object} req                    Express request. [REQUIRED]
   * @param  {object} transaction            Sequelize transaction
   * @param  {string} path                   Where in the body can data be found. [REQUIRED]
   * @return {Promise}                       Promise that resolves in the Data with association set, or null given that the association data was not found.
   *                                         An error is thrown only if something happens while trying to add to the database.
   */
  upsertAssociation: ({ associationUpsert, instance, associationName, req, transaction, path }) => {

    return new Promise((resolve, reject) => {
      if (!path) {
        resolve(null);
      }
      var data = _.get(req.body, path);
      if (data) {
        return associationUpsert({
          req: req,
          path: path,
          transaction: transaction
        })
        .then((result) => {
          return instance[`set${associationName}`](result, {transaction: transaction})
          .then((finalResult) => {
            console.log('finalResult');
            resolve(finalResult);
          }
          )
          .catch((err) => reject(err));
        })
        .catch((err) => reject(err));
      }
      else {
        return resolve(null);
      }
    });
  }
};


export default queryHelper;
