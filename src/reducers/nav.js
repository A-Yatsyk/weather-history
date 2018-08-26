import { NavigationActions } from 'react-navigation';
import AppNavigator from '../navigator/AppNavigator';

const firstAction = AppNavigator.router.getActionForPathAndParams('Main');
const initialNavState = AppNavigator.router.getStateForAction(firstAction);

export default (state = initialNavState, action) => {
  let nextState;
  switch (action.type) {
    case 'GET_HISTORY_WEATHER':
      nextState = AppNavigator.router.getStateForAction(NavigationActions.back(), state);
      break;
    default:
      nextState = AppNavigator.router.getStateForAction(action, state);
      break;
  }
  return nextState || state;
};
