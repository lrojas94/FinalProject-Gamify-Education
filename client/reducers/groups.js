import { Group as GroupModel } from './../models/group';
import { handleActions, Action } from 'redux-actions';
import reducerGenerator from './../helpers/generateReducer';
import constants from './../constants/';

const groupConstants = constants.groups; //we're only using that one, so..

const reducer = reducerGenerator({
  constants: groupConstants,
  modelName: 'group',
  model: GroupModel,
});

export default handleActions(reducer.handleActions, reducer.initialState)
