import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';

import Calendar from '../pages/Calendar'
import Day from '../pages/Day/index'
import Settings from '../pages/Settings'

const CalendarStack = createStackNavigator({
  Calendar: {
    screen: Calendar,
  },
  Day: {
    screen: Day,
    navigationOptions: ({ navigation }) => ({
      headerTitle: navigation.getParam('day', '')
    }),
  },
});

const MyDrawerNavigator = createDrawerNavigator({
  Home: {
    screen: CalendarStack,
  },
  Settings: {
    screen: Settings,
  }
});

export default createAppContainer(MyDrawerNavigator);