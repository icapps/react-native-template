const makeActionCreator = (type, argument) => {
  if (!type) {
    throw new Error('Type required! You can\'t have an action without a type.');
  }
  return args => ({
    type,
    [argument]: args,
  });
};

const asyncActionHandler = (actionName, asyncAction) => {
  const name = actionName.toUpperCase();

  const requestAction = makeActionCreator(`${name}_PENDING`, 'params');
  const loadedAction = makeActionCreator(`${name}_FULFILLED`, 'payload');
  const errorAction = makeActionCreator(`${name}_REJECTED`, 'error');

  return (...args) => async (dispatch) => {
    dispatch(requestAction(args));
    try {
      const data = await asyncAction(...args);
      return dispatch(loadedAction(data));
    } catch (error) {
      return dispatch(errorAction(error));
    }
  };
};

export default asyncActionHandler;
