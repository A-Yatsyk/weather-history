import React from 'react';
import PropTypes from 'prop-types';
import {
  View, Text, Dimensions, TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Month from '../constants/month';
import SubBlock from './SubBlock';
import WeatherInfo from './WeatherInfo';
import styles from '../styles/MainStyle';

const { width } = Dimensions.get('window');

const weatherIcon = (data, month) => {
  const { af, rain } = data[month];
  af.replace(/[^\d.]/g, '');
  rain.replace(/[^\d.]/g, '');
  let name;
  if (Boolean(af) > 14) name = 'md-snow';
  else if (rain > 100) name = 'ios-rainy';
  else name = 'ios-sunny';
  return <Ionicons name={name} size={width * 0.25} color="#db9864" />;
};

const renderWeatherInfo = (data, weather, month) => (
  <View style={styles.Main}>
    <View style={styles.MainBlock}>
      <View style={styles.MainBlockHeader}>
        {weatherIcon(data, month)}
        <View style={styles.MainBlockHeaderTitleContainer}>
          <Text style={styles.MainBlockHeaderTitle}>
            {weather.yyyy}
          </Text>
          <Text style={styles.MainBlockHeaderTitle}>{Month[month]}</Text>
        </View>
      </View>
      <WeatherInfo
        index={1}
        title="MAXIMUM TEMPERATURE:"
        text={weather.tmax}
      />
      <WeatherInfo
        index={1}
        title="MINIMUM TEMPERATURE:"
        text={weather.tmin}
      />
    </View>
    <SubBlock
      index={1}
      iconName="ios-sunny"
      title="Sunny hours"
      text={weather.sun.replace(/[^\d.]/g, '')}
    />
    <SubBlock
      index={2}
      iconName="ios-rainy"
      title="Precipitation level"
      text={weather.rain.replace(/[^\d.]/g, '')}
    />
    <SubBlock
      index={3}
      iconName="md-snow"
      title="Frosty days"
      text={weather.af.replace(/[^\d.]/g, '')}
    />
  </View>
);

const WeatherCard = ({
  data, month, setMonth,
}) => {
  const weather = data[month];
  return weather ? renderWeatherInfo(data, weather, month) : (
    <View style={styles.NoMonth}>
      <Text
        style={styles.NoMonthTitle}
      >
        {'There are no data for this month\nselect a month'}
      </Text>
      <View style={styles.NoMonthItem}>
        {Object.keys(data).map(item => (
          <TouchableOpacity key={item} onPress={() => setMonth(item - 1)}>
            <Text
              style={styles.NoMonthItemText}
            >
              {item}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

WeatherCard.propTypes = {
  data: PropTypes.objectOf(
    PropTypes.shape({
      af: PropTypes.string,
      rain: PropTypes.string,
      yyyy: PropTypes.string,
      tmax: PropTypes.string,
      tmin: PropTypes.string,
      sun: PropTypes.string,
    }),
  ).isRequired,
  setMonth: PropTypes.func.isRequired,
  month: PropTypes.arrayOf(PropTypes.string),
};

WeatherCard.defaultProps = {
  month: null,
};

export default WeatherCard;
