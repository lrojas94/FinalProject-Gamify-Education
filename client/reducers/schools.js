import { School as SchoolModel } from './../models/school';
import { handleActions, Action } from 'redux-actions';
import reducerGenerator from './../helpers/generateReducer';
import constants from './../constants/';

const schoolConstants = constants.schools; //we're only using that one, so..

const reducer = reducerGenerator({
  constants: schoolConstants,
  modelName: 'school',
  model: SchoolModel,
});

export default handleActions(reducer.handleActions, reducer.initialState)
