import constants from './../constants/';
import actionGenerator from './../helpers/generateActions';
const groupConstants = constants.groups;

const actions = actionGenerator({
  constants: groupConstants,
  baseUrl: 'groups/',
  resultObjectName: 'group',
  attributes: ['group']
});

export default actions;
