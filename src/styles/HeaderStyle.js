import { Platform } from 'react-native';

export const HeaderStyle = {
  backgroundColor: '#8ba892',
  paddingHorizontal: 10,
  shadowColor: 'transparent',
  borderBottomWidth: 0,
  elevation: 0,
  shadowOpacity: 0,
  marginLeft: 0,
};

export const HeaderTitleStyle = {
  color: '#d1dcd3',
  flex: 1,
  fontSize: 18,
  textAlign: 'left',
  alignSelf: 'center',
  marginLeft: Platform.OS === 'ios' ? -30 : -1,
  paddingLeft: 0,
};
