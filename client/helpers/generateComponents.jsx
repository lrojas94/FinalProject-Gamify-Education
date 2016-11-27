import React, {
    Component
} from 'react';
import * as axios from 'axios';
import Griddle from 'griddle-react';
import { FormattedMessage, injectIntl } from 'react-intl';
import {
    Link
} from 'react-router';

var observe =  require('observe');
import {
    connect
} from 'react-redux';
import {
    push
} from 'react-router-redux';
import {
    PagedTable
} from './../components/general/pagedTable';
import {
    LinkColumn
} from './../components/general/linkColumn';

var generateDelete = ({
        pluralDisplayName,
        displayName,
        actions,
        deleteOpts,
        url
    }) => {
        var {
            delete: deleteItem
        } = actions;

        function mapStateToProps(props) {
            return {
                session: props.session.session,
                [pluralDisplayName]: {
                    delete: props[pluralDisplayName].delete,
                    view: props[pluralDisplayName].view,
                }
            };
        }

        function mapDispatchToProps(dispatch) {
            return {
                delete: (id) => dispatch(deleteItem(id)),
                push: (path) => dispatch(push(path))
            };
        }

        class DeleteComponent extends Component {
            constructor(props) {
                super(props);
                this.displayName = `${displayName}Delete`
                this.delete.bind(this);
                this.cancelDelete.bind(this);
            };

            delete(e) {
                e.preventDefault();
                this.props.delete(this.props.params[`${displayName}Id`]);
            }

            cancelDelete(e) {
                    this.props.push(`/${url}/view/${this.props.params[`${displayName}Id`]}`);
      }

      render() {
        return (
          <div>
            <h3><FormattedMessage id='generator.delete'/> <FormattedMessage id={_.capitalize(displayName)}/> </h3>
            <div className='container-fluid'>
              <div className='row'>
                <div className='col-xs-12'>
                  <h4>{this.props[pluralDisplayName].delete.status === '' ? <FormattedMessage id='generator.confirmation'/> :
                       this.props[pluralDisplayName].delete.status === 'loading' ? <FormattedMessage id='generator.deleting'/> :
                       this.props[pluralDisplayName].delete.status === 'failure' ? <FormattedMessage id='generator.error' values={{error:this.props[pluralDisplayName].delete.error.message}}/> : ' -- NOT NEEDED -- WILL JUST REDIRECT --' }</h4>
                  <hr/>
                </div>
                {this.props[pluralDisplayName].delete.status === '' ? (
                  <div>
                    <div className='col-xs-6 form-group'>
                      <button className='btn btn-danger btn-block form-control' onClick={this.delete.bind(this)}><i className='fa fa-trash'></i><FormattedMessage id='generator.delete.yes'/></button>
                    </div>
                    <div className='col-xs-6 form-group'>
                      <button className='btn btn-default btn-block form-control' onClick={this.cancelDelete.bind(this)}> <FormattedMessage id='generator.cancel'/> </button>
                    </div>
                  </div>
                ):(<p className='text-center'> ... </p>)}
              </div>
            </div>
            <br/>
          </div>
        );
      }
  };

  return connect(mapStateToProps, mapDispatchToProps)(DeleteComponent);
}

var generateView = ({pluralDisplayName, displayName, view, actions, url}) => {

  var {
    fetch,
    deleteClear,
    updateClear
  } = actions

  function mapStateToProps(props) {
    return {
      session: props.session.session,
      [pluralDisplayName]: {
        view: props[pluralDisplayName].view,
        delete: props[pluralDisplayName].delete,
      }
    };
  }

  function mapDispatchToProps(dispatch, ownProps) {
    return {
      push: (path) => dispatch(push(path)),
      fetch: (id) => dispatch(fetch(id)),
      clear: () => {
        dispatch(deleteClear());
        dispatch(updateClear());
      },
    };
  }

  class ViewComponent extends Component {
      constructor(props) {
        super(props);
      };

      componentWillMount() {
        this.props.clear();

        if(!this.props[pluralDisplayName].view.data || (this.props[pluralDisplayName].view.data && this.props[pluralDisplayName].view.data.id !== this.props.params[`${displayName}Id`])){
          this.props.fetch(this.props.params[`${displayName}Id`]);
        }
      }

      componentWillReceiveProps(newProps) {
        if(newProps[pluralDisplayName].delete.status === 'success' && !newProps[pluralDisplayName].delete.data) {
          // Redirect to main site:
          this.props.push(`/${url}`);
          return;
        }
      }

      /**
       * viewElements should be composed of:
       * 	- title: {string} The title which the section will be presented with.
       * 	- properties: {array} object|string arry which mentions which properties of element should be considered.
       * 	- element: {string} path to element within view component props to access. By default, {displayName} will be used.
       * 	- properties.name: {string} the name to be displayed. Path will be used by default.
       * 	- properties.path: {string} path to acccess in the element content
       * @return {[type]} [description]
       */
      generateItems() {
        var result = _.map(view.elements, (e) => {
          var elemName = e.element || `${pluralDisplayName}.view.${displayName}.data`;
          var TemplateComponent = e.template;
          if(TemplateComponent) {
            var props = _.get(this.props, elemName);
            if(_.isEmpty(props)) {
                return '';
            }
            if(props) {
              props = _.isEmpty(props) ? {} : props.toJSON();
              return (
                <div key={e.title}>
                  <h3><FormattedMessage id={`generator.${displayName}.${e.title}`}/></h3>
                    <div className='row'>
                      <div className={e.className || 'col-xs-12'}>
                        <e.template {...props}/>
                      </div>
                  </div>
                  <hr/>
                </div>
              )
            }
            else return ''
          }

          var renderProperties = () => {
            return _.map(e.properties, (p) => {
              var p = _.isString(p) ? { name: p, path: p } : p;

              return (
                <div className='col-xs-12 col-sm-6' key={p.path}>
                <h4><FormattedMessage id={`generator.${displayName}.${p.name}`}/></h4>
                {p.template ? (
                    <p.template data={_.get(this.props, `${elemName}.${p.path}`)} />
                ): (
                    <p>{_.get(this.props, `${elemName}.${p.path}`)}</p>
                )}
                </div>
              );
            })
          }

          var renderedProperties = renderProperties();

          return (
            <div key={e.title}>
              { e.title ? <h3><FormattedMessage id={`generator.${displayName}.${e.title}`}/></h3> : ''}
              <div className='row'>
              {renderedProperties}
              </div>
              <hr/>
            </div>
          );
        });

        return result;
      }

      render() {

        if(this.props[pluralDisplayName].view.error) {
          return (
            <div className='padded-content'>
              <div className='container-fluid'>
                <div className='row'>
                  <div className='col-xs-12'>
                    <h3><FormattedMessage id='generator.error.title'/></h3>
                    <hr/>
                    <div className='alert alert-danger'> <FormattedMessage id='generator.error' value={{error: this.props[pluralDisplayName].view.error.message}}/></div>
                  </div>
                </div>
              </div>
            </div>
          );
        }

        if(this.props[pluralDisplayName].view[displayName].loading || !this.props[pluralDisplayName].view[displayName].data){
          return (
            <div className='container-fluid'>
              <div className='row'>
                <div className='col-xs-12'>
                  <div className='alert alert-info'> <FormattedMessage id='generator.loading'/> </div>
                </div>
              </div>
            </div>
          );
        }

        return (
          <div className='padded-content'>
            <div className='row'>
              <div className='col-xs-12 text-right'>
                <Link to={`/${url}`} className='btn-fab-sm m-amber'><i className="material-icons">reply</i></Link>
                <Link to={`/${url}/view/${this.props.params[`${displayName}Id`]}`} className='btn-fab-sm m-light-blue'><i className="material-icons">search</i></Link>
                {this.props.session.hasPermission(`/${url}/edit/${this.props.params[`${displayName}Id`]}`) ? (
                  <Link to={`/${url}/edit/${this.props.params[`${displayName}Id`]}`} className='btn-fab-sm m-light-green'><i className="material-icons">edit</i></Link>
                ): ''}
                {this.props.session.hasPermission(`/${url}/delete/${this.props.params[`${displayName}Id`]}`) ? (
                  <Link to={`/${url}/delete/${this.props.params[`${displayName}Id`]}`} className='btn-fab-sm m-red'><i className="material-icons">delete</i></Link>
                ): ''}
              </div>
            </div>
            <h3><FormattedMessage id={_.capitalize(view.title)}/></h3>
            <div className='container-fluid'>
              {this.generateItems()}
            </div>

            { this.props.children }

          </div>
        );
      }
  };

  return connect(mapStateToProps, mapDispatchToProps)(ViewComponent);
}


var generateList = ({ actions, displayName, pluralDisplayName, list, url }) => {

  var { fetchAll } = actions;

  function mapStateToProps(props) {

    list.metadata = _.map(list.metadata, (e) => {
      e.session = props.session.session;
      return e;
    })

    return {
      session: props.session.session,
      [pluralDisplayName]: {
        table: props[pluralDisplayName].table,
        delete: props[pluralDisplayName].delete
      }
    };
  }

  function mapDispatchToProps(dispatch, ownProps) {
    return {
      fetchAll: (page, flush, searchQuery) => dispatch(fetchAll(page, flush, searchQuery))
    };
  }

  class List extends Component {
      constructor(props) {
        super(props);
      };
      /**
       * Function to add edit/delete buttons.
       * @return {html} Returns HTML code to reder the buttons.
       */
      renderRoutes() {
        if(this.props.session.hasPermission(`/${url}/add`)){
          return ''
          // return <PermissionsAdd />
        }

      }

      render() {
        return (
          <div className='padded-content'>
            <div className='row'>
              <div className='col-xs-12 text-right'>
                {this.props.session.hasPermission(`/${url}/add`) ? (
                  <Link to={`/${url}/add`} className='btn-fab-sm m-light-green'><i className="material-icons">add</i></Link>
                ): ''}
              </div>
            </div>

            <h3> <FormattedMessage id='generator.manageExisting'/> </h3>
            <PagedTable
              queryKeys={list.queryKeys}
              table={this.props[pluralDisplayName].table.data}
              error={this.props[pluralDisplayName].table.error}
              loading={this.props[pluralDisplayName].table.loading}
              columnMetadata={list.metadata}
              fetch={this.props.fetchAll}
              columns={list.columns}
            />
          </div>
        );
      }
  };


  return connect(mapStateToProps, mapDispatchToProps)(List);

}

/**
 * - Forms -> What forms are to be included. (toggler/name/component)
 * - pickAttributes -> which attributes will be sent to the server
 * - initialState -> Initial component state
 */


/**
 * Creates an Add/Edit component to create items.
 * crateOpts contains:
   {
    forms: Each form that will be included in the add of the new item. (It might be composed of more than 1.),
    forms are composed by:
      {
      toggler: an UNIQUE name which allows this form to be included or not.
      name: The title name to be displayed.
      stateName: What name does this form has in the state.
      component: Form component.
      multiple: {
        statePath: the path in which items are found. ** REQUIRED **
        stateTemplate: an object which represents the state of each of the forms.
        initialId: defaults to 0, defines the inital ID for the forms. (No real reason to modify this, but in any case.)
      }
    }
  }
 */

var generateAddEdit = ({ displayName, pluralDisplayName, opts, url }) => {
  const initialState = _.assign({}, opts.initialState);
  class CreateUpdate extends Component {
      constructor(props) {
        super(props);
        this.generateManagingFunctions();
        this.state = _.assign({}, { multiforms: this.multiforms || [] }, this.props.initialState || initialState);
      };

      componentWillMount() {
        this.props.clearItem();
      }

      componentWillReceiveProps(props) {
        if(props[pluralDisplayName].status === 'success' ) {
          return this.props.push(`/${pluralDisplayName}`);
        }
      }

      performActionWithItem(e) {
        var form = this.refs.form;

        if(form.checkValidity()) {
          e.preventDefault();
          var multiforms = {};
          _.forEach(this.state.multiforms, (val, key) => {
            var items = _.map(val.items, (item) => {
              return item.item; //ignore id here.
            });


            multiforms[val.statePath] = items;
          });
          var data = _(_.assign({}, this.state, multiforms))
          .pick(opts.pickAttributes)
          .mapValues((obj) => {
            if(_.isArray(obj)){
              return obj;
            }
            var data =  _.chain(obj).mapValues((v) => _.isObject(v) ? v : _.toString(v)).omitBy(_.isEmpty).value();
            return data;
          })
          .omitBy(_.isEmpty)
          .value();

          // this.setState(_.assign({}, this.state, this.props.initialState || initialState))
          this.props.addUpdateItem(data);
        }

      }

      generateMultiform(form) {
        if(!form.multiple) {
          return; // Just in case.
        }

        var currentState = _.assign({}, this.props.initialState || initialState);
        var currentItems = {};
        var idGenerator = form.multiple.initialId || 0;

        if(form.multiple.statePath) {
          currentItems = _.get(currentState, form.multiple.statePath);
          /**
           * Represent how items are actually present in the state.
           */
          var statefulItems = _.map(currentItems, (item) => {
            return {
              id: idGenerator++,
              item
            }
          });

          var formState =  {
            nextId: idGenerator,
            items: statefulItems,
            statePath: form.multiple.statePath
          }

          // Create item function
          formState.addItem = () => {
            var multiforms = this.state.multiforms;

            if(!multiforms[form.name]) {
              multiforms[form.name] = formState;
            }

            multiforms[form.name].items.push({
              id: formState.nextId++,
              item: _.assign({}, form.multiple.stateTemplate)
            })

            this.setState({ multiforms });
          };
          // Remove item function.
          formState.removeItem = (id) => {
            var multiforms = this.state.multiforms;

            if(!multiforms[form.name]) {
              multiforms[form.name] = formState;
            }
            multiforms[form.name].items = _.filter(multiforms[form.name].items, (item) => !(item.id === id));

            this.setState({ multiforms });
          };

          return formState;

        }


      }

      /**
       * Generated function creator.
       */
      generateManagingFunctions() {
        var handlers = {};
        var togglers = {};
        var multiFormHandlers = {};

        _.forEach(opts.forms, (form) => {
          // Hadlers
          handlers[form.name] = (e) => { this.handleForm(e, form.stateName) };
          // Togglers.
          if(form.toggler) {
            togglers[form.name] = (e) => { this.showToggler(e, form.toggler) }
          }
          // Multiple forms.
          if(form.multiple) {
            multiFormHandlers[form.name] = this.generateMultiform(form);
          }
        })
        this.handlers = handlers;
        this.togglers = togglers;
        this.multiforms = multiFormHandlers;
      }
      /**
       * e -> Event data.
       * type -> State name & Path/
       */
      handleForm(e, type) {
        var name = e.target.getAttribute('name');
        var data = _.assign({}, this.state[type] || this.state);
        data[name] = e.target.value;
        this.setState({ [type]: data });
      }

      showToggler(e, type) {
        e.preventDefault;
        var show = e.target.getAttribute('data-show') == 'true';
        this.setState({ [type]: show });
      }

      generateMultiformDisplay(form) {
        var Component = form.component;
        var handler = this.state.multiforms[form.name];
        var generateItems = () => {
          return _.map(handler.items, (elem) => {
            var onChange = (id, e) => {
              var multiforms = this.state.multiforms;
              var updatedItems = _.map(multiforms[form.name].items, (item) =>  {
                if(item.id === id) {
                  item.item[e.target.getAttribute('name')] = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
                }

                return item;
              });

              var updatedForm = _.assign({}, multiforms[form.name], { items: updatedItems });
              multiforms = _.assign({}, multiforms, { [form.name]: updatedForm });
              this.setState({ multiforms });
            }

            return (
              <div key={elem.id}>
                <Component {...elem.item}
                           handleFormChange={onChange.bind(this, elem.id)} />
                <button className='btn btn-block m-red' onClick={(e) => {
                  e.preventDefault();
                  handler.removeItem(elem.id)
                }}>
                <FormattedMessage id='generator.removeBtn'/>
                </button>
              </div>
            );
          })
        }
        return (
          <div className='row'>
           <div className='col-xs-12'>
             <h3> {_.capitalize(form.name)} </h3>
             <button className='btn btn-block m-light-green' onClick={(e) => {
               e.preventDefault();
               handler.addItem();
             }} >
                <FormattedMessage id='generator.addNewElement'/> <FormattedMessage id={_.capitalize(form.name)}/>
             </button>
             <br/>
             {generateItems()}
           </div>
          </div>
        )
      }

      generateFormsDisplay() {
       var forms = _.map(opts.forms, (form) => {
         var Component = form.component;

         var displayToggler = () => {
           var display = form.multiple ? this.generateMultiformDisplay(form) : (
             <div className='row'>
              <div className='col-xs-12'>
                <h3> {_.capitalize(form.name)} </h3>
                <Component
                 {...this.state[form.stateName]}
                 handleFormChange={this.handlers[form.name].bind(this)}/>
              </div>
             </div>
           );

           if(form.toggler) {
             // This is a toggler form.
             if(this.state[form.toggler]) {
               // we are to show the form
               return display;
             }
             return '';
           }
           else {
             return display;
           }
         }
         return (
           <div key={form.name}>
             {form.toggler ? (
               <div className='row'>
                 <h3 className='text-center'> <FormattedMessage id="generator.addEdit"/> <FormattedMessage id={_.capitalize(form.name)}/>?</h3>
                 <div className='col-xs-6'>
                   <button type='button' className={`btn btn-block ${this.state[form.toggler] ? 'm-light-blue' : 'btn-default'}`}
                   data-show={'true'} onClick={this.togglers[form.name].bind(this)}>Yes</button>
                 </div>

                 <div className='col-xs-6'>
                   <button type='button' className={`btn btn-block ${!this.state[form.toggler] ? 'm-light-blue' : 'btn-default'}`}
                   data-show={'false'} onClick={this.togglers[form.name].bind(this)}>No</button>
                 </div>
                 <hr/>
               </div>
             ) : ''}
             {displayToggler()}
              <hr/>
           </div>
         );
       })

       return forms;
      }


      render() {

        return (
          <div className='padded-content'>
            <div className='row'>
              <div className='col-xs-12 text-right'>
                <Link to={`/${url}`} className='btn-fab-sm m-yellow'><i className="material-icons">reply</i></Link>
              </div>
            </div>

            <h3> <FormattedMessage id={`generator.${opts.title}`}/> <FormattedMessage id={_.capitalize(displayName)}/> </h3>
            <div className='container-fluid'>
              <div className='row'>
                <div className='col-xs-12'>
                  <h4><FormattedMessage id='generator.creating' values={{element: this.props.intl.messages[`${_.capitalize(displayName)}`]}}/></h4>
                  <hr/>
                  { this.props[pluralDisplayName].status === 'success' ? (
                    <div className='alert alert-success'> <FormattedMessage id={_.capitalize(displayName)}/><strong>{this.props[pluralDisplayName].data.name}</strong> <FormattedMessage id='generator.addEdit.success'/> </div>
                  ) : '' }
                  { this.props[pluralDisplayName].error && this.props[pluralDisplayName].status === 'failure' ? (
                    <div className='alert alert-danger'><FormattedMessage id='generator.error' value={{ error: this.props[pluralDisplayName].error.message }}/></div>
                  ) : '' }
                  <form className='form' action='/api/{url}' ref='form' onSubmit={this.performActionWithItem.bind(this)}>

                    {this.generateFormsDisplay()}

                    <div className='form-group'>
                      <div className='col-xs-6 col-xs-offset-3'>
                        <button type='submit' onClick={this.performActionWithItem.bind(this)} className={`btn form-control m-light-green btn-block ${this.props[pluralDisplayName].loading ? 'disabled' : ''}`}>
                          {this.props[pluralDisplayName].loading ? <span><FormattedMessage id={`generator.${opts.loadingTitle}`}/> <FormattedMessage id={`generator.${_.capitalize(displayName)}`}/>...</span> : (<span><i className='fa fa-plus'></i> <FormattedMessage id={`generator.${opts.title}`}/></span>)}
                        </button>
                      </div>
                    </div>
                  </form>
                  <br/>
                  <br/>
                </div>
              </div>
            </div>
          </div>
        );
      }
  };

  return CreateUpdate;
}

var generateAdd = ({ displayName, pluralDisplayName, createOpts, actions, url }) => {
  const { create: createItem, createClear: createItemClear } = actions;

  function mapStateToProps(props) {
    return {
      session: props.session.session,
      [pluralDisplayName]: props[pluralDisplayName].create
    };
  }

  function mapDispatchToProps(dispatch) {
    return {
      addUpdateItem: (data) => dispatch(createItem(data)),
      clearItem: () => dispatch(createItemClear()),
      push: (path) => dispatch(push(path))
    };
  }



  return connect(mapStateToProps, mapDispatchToProps)(injectIntl(generateAddEdit({
    displayName,
    pluralDisplayName,
    url,
    opts: _.merge({}, createOpts, { title: 'add', loadingTitle: 'add.loading'})
  })));

}

var generateUpdate = ({ displayName, pluralDisplayName, update, actions, url }) => {
  const { update: updateItem, updateClear: updateClearItem } = actions;

  function mapStateToProps(props) {
    var initialState = update.initialState;
    var view = props[pluralDisplayName].view[displayName];
    _.forEach(update.viewAttributesToState, (attr) => {
      if(view && view.data) {
        initialState[attr.name] = attr.path ? view.data[attr.path] : view.data;
      }
    })

    return {
      session: props.session.session,
      [pluralDisplayName]: props[pluralDisplayName].update,
      initialState
    };
  }

  function mapDispatchToProps(dispatch) {
    return {
      addUpdateItem: (data) => {
        var id = data.id || data[displayName].id;
        dispatch(updateItem(id, data))
      },
      clearItem: () => { return; },
      push: (path) => dispatch(push(path))
    };
  }



  return connect(mapStateToProps, mapDispatchToProps)(injectIntl(generateAddEdit({
    displayName,
    pluralDisplayName,
    url,
    opts: _.merge({}, update, { title: 'edit', loadingTitle: 'edit.loading'})
  })));

}

var generator = ({displayName, view, update, list, deleteOpts, createOpts , actions, url }) => {
  var base = {
    actions,
    displayName,
    pluralDisplayName: `${displayName}s`,
    url
  }

  return {
    delete: generateDelete(_.assign({}, base, { deleteOpts })),
    view: generateView(_.assign({}, base, { view })),
    list: generateList(_.assign({}, base, { list })),
    create: generateAdd(_.assign({}, base, { createOpts })),
    update: generateUpdate(_.assign({}, base, { update })),
  };
}

export default generator;
