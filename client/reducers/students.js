import { Student as StudentModel } from './../models/student';
import { handleActions, Action } from 'redux-actions';
import reducerGenerator from './../helpers/generateReducer';
import constants from './../constants/';

const studentConstants = constants.students; //we're only using that one, so..

const reducer = reducerGenerator({
  constants: studentConstants,
  modelName: 'student',
  model: StudentModel,
});

export default handleActions(reducer.handleActions, reducer.initialState)
