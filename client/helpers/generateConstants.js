const generate = (name) => {
  const constants = {
    /**
     * Table constants
     * @type {String}
     */
    [`FETCH_ALL`]: `FETCH_${name}S`,
    [`FETCH_ALL_LOADING`]: `FETCH_${name}S_LOADING`,
    [`FETCH_ALL_SUCCESS`]: `FETCH_${name}S_SUCCESS`,
    [`FETCH_ALL_FAILURE`]: `FETCH_${name}S_FAILURE`,

    /**
    * Single Item View/Fetch constants.
    * @type {String}
    */
    [`FETCH`]: `FETCH_${name}`,
    [`FETCH_SUCCESS`]: `FETCH_${name}_SUCCESS`,
    [`FETCH_FAILURE`]: `FETCH_${name}_FAILURE`,
    [`FETCH_LOADING`]: `FETCH_${name}_LOADING`,

    /**
     * Edit Item constants.
     * @type {String}
     */
    [`UPDATE`]: `UPDATE_${name}`,
    [`UPDATE_LOADING`]: `UPDATE_${name}_LOADING`,
    [`UPDATE_SUCCESS`]: `UPDATE_${name}_SUCCESS`,
    [`UPDATE_FAILURE`]: `UPDATE_${name}_FAILURE`,
    /**
     * Create Item constants.
     * @type {String}
     */
    [`CREATE`]: `CREATE_${name}`,
    [`CREATE_LOADING`]: `CREATE_${name}_LOADING`,
    [`CREATE_SUCCESS`]: `CREATE_${name}_SUCCESS`,
    [`CREATE_FAILURE`]: `CREATE_${name}_FAILURE`,
    /**
     * Delete Item constants
     * @type {String}
     */
    [`DELETE`]: `DELETE_${name}`,
    [`DELETE_LOADING`]: `DELETE_${name}_LOADING`,
    [`DELETE_SUCCESS`]: `DELETE_${name}_SUCCESS`,
    [`DELETE_FAILURE`]: `DELETE_${name}_FAILURE`,
    /**
     * Delete Item constants
     * @type {String}
     */
    [`FETCH_OPTIONS`]: `FETCH_OPTIONS_${name}`,
    [`FETCH_OPTIONS_LOADING`]: `FETCH_OPTIONS_${name}_LOADING`,
    [`FETCH_OPTIONS_SUCCESS`]: `FETCH_OPTIONS_${name}_SUCCESS`,
    [`FETCH_OPTIONS_FAILURE`]: `FETCH_OPTIONS_${name}_FAILURE`,
  }

  return constants;
}

export default generate;
