import React from 'react';
import PropTypes from 'prop-types';
import { Dimensions, View, Text } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from '../styles/MainStyle';

const { width } = Dimensions.get('window');

const SubBlock = ({
  title, text, index, iconName,
}) => (
  <View key={`SubBlock${index}`} style={[styles.SubBlock, styles[`SubBlock${index}`]]}>
    <View>
      <Text style={[styles.SubBlockTitle, styles[`SubBlockTitle${index}`]]}>{title}</Text>
      <Text style={styles.SubBlockSubTitle}>{text || 'no data'}</Text>
    </View>
    <Ionicons name={iconName} size={width * 0.15} color="#edccb2" />
  </View>
);

SubBlock.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string,
  index: PropTypes.number.isRequired,
  iconName: PropTypes.string.isRequired,
};

SubBlock.defaultProps = {
  text: null,
};

export default SubBlock;
