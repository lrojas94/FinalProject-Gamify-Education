import constants from './../constants/';
import actionGenerator from './../helpers/generateActions';
const teacherConstants = constants.teachers;

const actions = actionGenerator({
  constants: teacherConstants,
  baseUrl: 'teachers/',
  resultObjectName: 'teacher',
  attributes: ['teacher','person']
});

export default actions;
