import { StyleSheet, Dimensions, Platform } from 'react-native';
import {} from '../constants/Colors';

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
  HeaderLeftButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  HeaderLeftButtonText: {
    color: '#d1dcd3',
    fontWeight: 'bold',
  },

  MainNoData: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  MainNoDataIcon: {
    position: 'absolute',
  },

  Menu: {
    position: 'absolute',
    backgroundColor: Platform.OS === 'ios' ? 'transparent' : '#fff',
    height: height * 0.45,
    width,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    bottom: -(height * 0.45),
  },
  MenuAbsolute: {
    borderTopLeftRadius: 30,
    height: '100%',
    borderTopRightRadius: 30,
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#8ba892',
  },
  MenuSection: {
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  SectionText: {
    fontWeight: 'bold',
    color: '#d1dcd3',
    fontSize: 19,
  },

  Message: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  MessageText: {
    fontWeight: 'bold',
    fontSize: 19,
    color: '#d1dcd3',
  },

  Main: {
    flex: 1,
  },
  MainBlock: {
    backgroundColor: '#e3bb88',
    height: '55%',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    paddingVertical: 20,
  },
  SubBlock: {
    height: '15%',
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  SubBlock1: {
    backgroundColor: '#db9864',
  },
  SubBlock2: {
    backgroundColor: '#b2695a',
  },
  SubBlock3: {
    backgroundColor: '#644748',
  },
  SubBlockTitle: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  SubBlockTitle1: {
    color: '#edccb2',
  },
  SubBlockTitle2: {
    color: '#d0a59c',
  },
  SubBlockTitle3: {
    color: '#f5e4cf',
  },
  SubBlockSubTitle: {
    color: '#fff',
    fontSize: 25,
    fontWeight: 'bold',
  },
  MainBlockHeader: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
  },
  MainBlockHeaderTitleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  MainBlockHeaderTitle: {
    color: '#f5e4cf',
    fontSize: 25,
    fontWeight: 'bold',
    paddingVertical: 5,
  },
  WeatherInfoContainer: {
    width: '100%',
    justifyContent: 'center',
  },
  WeatherInfoTitle: {
    fontWeight: 'bold',
    color: '#fff',
    fontSize: 19,
    textAlign: 'center',
    paddingBottom: 5,
  },
  WeatherInfoSubTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  WeatherInfoSubDataTitle: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#fff',
    paddingHorizontal: 10,
  },
  PickerStyle: {
    width: 150,
    height: height * 0.3,
  },
  PickerItemStyle: {
    color: '#d1dcd3',
    fontSize: 26,
  },

  NoMonth: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  NoMonthTitle: {
    fontSize: 16,
    paddingVertical: 10,
    color: '#8ba892',
  },
  NoMonthItem: {
    flexDirection: 'row',
    paddingVertical: 10,
    justifyContent: 'center',
  },
  NoMonthItemText: {
    marginHorizontal: 5,
    borderRadius: 10,
    paddingVertical: 5,
    color: '#d1dcd3',
    width: 30,
    textAlign: 'center',
    backgroundColor: '#8ba892',
  },
});
