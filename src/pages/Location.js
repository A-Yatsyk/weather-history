import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  Text, View, TouchableOpacity, FlatList,
} from 'react-native';

import { connect } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';

import ListCity from '../constants/urlAPI';
import { getHistoryWeather } from '../actions/weather';

import {
  HeaderStyle as headerStyle,
  HeaderTitleStyle as headerTitleStyle,
} from '../styles/HeaderStyle';
import styles from '../styles/LocationStyle';

class Location extends PureComponent {
static navigationOptions = ({ navigation: { goBack } }) => ({
  title: 'Location',
  headerStyle,
  headerTitleStyle,
  headerLeft: (
    <TouchableOpacity onPress={() => goBack()} style={styles.HeaderButtonLeft}>
      <Ionicons name="ios-arrow-back" color="#d1dcd3" size={28} />
    </TouchableOpacity>
  ),
})

setLocation = (city) => {
  const { navigation: { dispatch, goBack }, weatherKey } = this.props;
  if (weatherKey === city) {
    goBack();
    return;
  }
  dispatch(getHistoryWeather(city));
}

renderItem = item => (
  <TouchableOpacity
    key={item}
    onPress={() => this.setLocation(item)}
    style={styles.Button}
  >
    <Ionicons name="ios-arrow-back" color="#fff" size={20} />
    <Text style={styles.ButtonText}>{item.toUpperCase()}</Text>
  </TouchableOpacity>
);

render() {
  return (
    <View style={styles.Main}>
      <Text style={styles.Title}>CITY:</Text>
      <FlatList
        data={ListCity}
        renderItem={({ item }) => this.renderItem(item)}
      />
    </View>
  );
}
}

Location.propTypes = {
  navigation: PropTypes.shape({
    dispatch: PropTypes.func,
    goBack: PropTypes.func,
  }).isRequired,
  weatherKey: PropTypes.string,
};

Location.defaultProps = {
  weatherKey: null,
};

const mapStateToProps = ({ weather: { weatherKey } }) => ({
  weatherKey,
});

export default connect(mapStateToProps)(Location);
