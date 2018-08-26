import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  TouchableWithoutFeedback,
  Animated,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Pulse } from 'react-native-loader';
import Picker from 'react-native-wheel-picker';

import WeatherCard from '../components/WeatherCard';

import Month from '../constants/month';
import { HeaderStyle } from '../styles/HeaderStyle';
import styles from '../styles/MainStyle';

class Main extends Component {
  static navigationOptions = ({
    navigation: { state, navigate }, screenProps: { weatherKey },
  }) => ({
    headerStyle: HeaderStyle,
    headerRight: state.params && state.params.animatedMenu && (
      <TouchableOpacity
        onPress={() => state.params.animatedMenu()}
      >
        <Ionicons name="ios-more" size={30} color="#d1dcd3" />
      </TouchableOpacity>
    ),
    headerLeft: (
      <TouchableOpacity
        onPress={() => {
          if (state.params && state.params.closeMenu) {
            state.params.closeMenu();
          }
          navigate('Location');
        }}
        style={styles.HeaderLeftButton}
      >
        <Entypo name="location-pin" size={30} color="#d1dcd3" />
        <Text
          style={[styles.HeaderLeftButtonText, { fontSize: weatherKey ? 18 : 10 }]}
        >
          {(weatherKey && (weatherKey.charAt(0).toUpperCase() + weatherKey.slice(1))) || 'press and choose city'}
        </Text>
      </TouchableOpacity>
    ),
  });

  static getDerivedStateFromProps(props, state) {
    if (props.weatherKey !== state.weatherKey || props.data !== state.data) {
      return {
        menuExpanded: false,
        itemYear: Object.keys(props.data),
        selectedYear: 0,
        weatherKey: props.weatherKey,
        data: props.data,
      };
    }
    return state;
  }

  constructor(props) {
    super(props);

    this.width = Dimensions.get('window').width;
    this.height = Dimensions.get('window').height;
    this.yTranslate = new Animated.Value(0);

    this.state = {
      menuExpanded: false,
      itemYear: [],
      selectedYear: 0,
      weatherKey: null,
      itemMonth: Object.keys(Month),
      selectedMonth: 0,
      data: {},
    };
  }

  componentDidMount() {
    this.setMenu();
  }

  componentDidUpdate() {
    this.setMenu();
  }

  setMenu() {
    const { data } = this.state;
    const { navigation: { setParams, state } } = this.props;
    if (
      (!state.params || !state.params.animatedMenu)
      && Object.keys(data).length > 0
    ) {
      setParams({ animatedMenu: this.animatedMenu, closeMenu: this.closeMenu });
    }
  }

  closeMenu = () => this.yTranslate.setValue(0);

  animatedMenu = () => {
    const { state: { menuExpanded } } = this;
    this.setState(prevState => ({
      menuExpanded: !prevState.menuExpanded,
    }), () => {
      this.yTranslate.setValue(Number(menuExpanded));
      Animated.spring(
        this.yTranslate,
        {
          toValue: Number(!menuExpanded),
          bounciness: 0,
        },
      ).start();
    });
  }

  setYear = selectedYear => this.setState({ selectedYear })

  setMonth = selectedMonth => this.setState({ selectedMonth })

  renderNoData = () => (
    <View style={styles.MainNoData}>
      <Pulse size={this.width * 0.4} color="#d1dcd3" />
      <Ionicons style={styles.MainNoDataIcon} name="md-cloud-download" size={this.width * 0.4} color="#8ba892" />
    </View>
  );

  renderPicker = (selected, item, callback) => (
    <Picker
      style={styles.PickerStyle}
      selectedValue={selected}
      itemStyle={styles.PickerItemStyle}
      onValueChange={callback}
    >
      {item.map((value, index) => (
        <Picker.Item label={value} value={index} key={value} />
      ))}
    </Picker>
  );

  renderData = (menuExpanded) => {
    const {
      data, itemYear, selectedYear, itemMonth, selectedMonth,
    } = this.state;
    return (
      <Fragment>
        <TouchableWithoutFeedback disabled={!menuExpanded} onPress={this.animatedMenu}>
          <View style={{ flex: 1 }}>
            <WeatherCard
              setMonth={this.setMonth}
              data={data[itemYear[selectedYear]]}
              month={[itemMonth[selectedMonth]]}
            />
          </View>
        </TouchableWithoutFeedback>
        {this.renderMenu()}
      </Fragment>
    );
  }

  renderMenu = () => {
    const {
      itemYear, selectedYear, selectedMonth, itemMonth, menuExpanded,
    } = this.state;
    const menuMoveY = this.yTranslate.interpolate({
      inputRange: [0, 1],
      outputRange: [0, -(this.height * 0.45)],
    });
    return (
      <Animated.View
        style={[styles.Menu, {
          transform: [{ translateY: menuMoveY }],
        }]}
      >
        <View style={styles.MenuAbsolute}>
          <View style={styles.MenuSection}>
            <Text style={styles.SectionText}>YEAR</Text>
            {menuExpanded && this.renderPicker(selectedYear, itemYear, this.setYear)}
          </View>
          <View style={styles.MenuSection}>
            <Text style={styles.SectionText}>MONTH</Text>
            {menuExpanded && this.renderPicker(selectedMonth, itemMonth, this.setMonth)}
          </View>
        </View>
      </Animated.View>
    );
  }

  render() {
    const {
      menuExpanded, itemYear, selectedYear, data, weatherKey,
    } = this.state;
    if (!weatherKey) {
      return (
        <View style={styles.Message}>
          <Ionicons name="ios-arrow-round-up" size={this.width * 0.25} color="#d1dcd3" />
          <Text style={styles.MessageText}>Choose a city</Text>
        </View>
      );
    }
    return data && data[itemYear[selectedYear]]
      ? this.renderData(menuExpanded)
      : this.renderNoData();
  }
}

Main.propTypes = {
  data: PropTypes.objectOf(
    PropTypes.objectOf(
      PropTypes.objectOf(
        PropTypes.string,
      ),
    ),
  ),
  navigation: PropTypes.shape({
    dispatch: PropTypes.func.isRequired,
    setParams: PropTypes.func.isRequired,
  }).isRequired,
  weatherKey: PropTypes.string,
};

Main.defaultProps = {
  data: {},
  weatherKey: null,
};

const mapStateToProps = ({ weather: { data, weatherKey } }) => ({
  data: data[weatherKey],
  weatherKey,
});

export default connect(mapStateToProps)(Main);
