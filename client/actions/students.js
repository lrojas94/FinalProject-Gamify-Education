import constants from './../constants/';
import actionGenerator from './../helpers/generateActions';
const studentConstants = constants.students;

const actions = actionGenerator({
  constants: studentConstants,
  baseUrl: 'students/',
  resultObjectName: 'student',
  attributes: ['student','person']
});

export default actions;
