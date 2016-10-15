import constants from './../constants/';
import actionGenerator from './../helpers/generateActions';
const schoolConstants = constants.schools;

const actions = actionGenerator({
  constants: schoolConstants,
  baseUrl: 'schools/',
  resultObjectName: 'school',
  attributes: ['school']
});

export default actions;
