import { Teacher as TeacherModel } from './../models/teacher';
import { handleActions, Action } from 'redux-actions';
import reducerGenerator from './../helpers/generateReducer';
import constants from './../constants/';

const teacherConstants = constants.teachers; //we're only using that one, so..

const reducer = reducerGenerator({
  constants: teacherConstants,
  modelName: 'teacher',
  model: TeacherModel,
});

export default handleActions(reducer.handleActions, reducer.initialState)
