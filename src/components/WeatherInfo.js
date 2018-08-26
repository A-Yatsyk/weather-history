import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from '../styles/MainStyle';

const WeatherInfo = ({
  title, text, index,
}) => (
  <View key={`WeatherInfo${index}`} style={styles.WeatherInfoContainer}>
    <Text style={styles.WeatherInfoTitle}>{title}</Text>
    <View style={styles.WeatherInfoSubTitle}>
      <Ionicons name="ios-thermometer" size={20} color="#fff" />
      <Text style={styles.WeatherInfoSubDataTitle}>{text}</Text>
    </View>
  </View>
);

WeatherInfo.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string,
  index: PropTypes.number.isRequired,
};

WeatherInfo.defaultProps = {
  text: null,
};

export default WeatherInfo;
