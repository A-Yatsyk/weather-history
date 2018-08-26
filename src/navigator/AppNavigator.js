import { StackNavigator } from 'react-navigation';

import { Main, Location } from '../pages';

export default StackNavigator({
  Main: { screen: Main },
  Location: { screen: Location },
});
