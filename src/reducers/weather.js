import * as ACTIONS from '../actions/weather';

const initialState = {
  data: {},
  weatherKey: null,
  error: null,
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case ACTIONS.GET_HISTORY_WEATHER:
      return {
        ...state,
        weatherKey: action.city,
      };
    case ACTIONS.GET_HISTORY_WEATHER_SUCCESS:
      return {
        ...state,
        data: {
          ...state.data,
          [action.city]: action.data,
        },
      };
    case ACTIONS.GET_HISTORY_WEATHER_FAILURE:
      return {
        ...state,
        weatherKey: null,
        error: action.error,
      };
    default:
      return state;
  }
};
