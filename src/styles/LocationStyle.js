import { StyleSheet } from 'react-native';
import {} from '../constants/Colors';

export default StyleSheet.create({
  Main: {
    flex: 1,
    backgroundColor: '#e3bb88',
  },
  Title: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingHorizontal: 25,
    marginVertical: 25,
    color: '#f5e4cf',
  },
  Button: {
    width: '100%',
    paddingVertical: 7.5,
    paddingHorizontal: 25,
    shadowColor: '#fff',
    flexDirection: 'row',
  },
  ButtonText: {
    fontWeight: 'bold',
    fontSize: 17,
    color: '#fff',
    paddingLeft: 25,
  },
  HeaderButtonLeft: {
    paddingLeft: 12,
    paddingVertical: 5,
  },
});
