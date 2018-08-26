import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  BackHandler, DeviceEventEmitter, StatusBar, Platform, Modal, View, Dimensions, NetInfo, Text,
} from 'react-native';

import { NavigationActions } from 'react-navigation';
import { Pulse } from 'react-native-loader';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { isEqual } from 'lodash';

import { addListener } from '../helpers/redux';
import AppNavigator from './AppNavigator';

import { HeaderStyle } from '../styles/HeaderStyle';

class AppWithNavigationState extends Component {
  static getDerivedStateFromProps = (_, state) => ({
    state,
  })

  constructor(props) {
    super(props);
    this.width = Dimensions.get('window').width;
    this.state = {
      internetConnection: true,
    };
    this.backPressSubscriptions = new Set();
  }

  componentDidMount() {
    NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectivityChange);
    DeviceEventEmitter.removeAllListeners('hardwareBackPress');
    DeviceEventEmitter.addListener('hardwareBackPress', this.hardwareBackPress);
    this.backPressSubscriptions.add(this.handleHardwareBack);
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { state, props } = this;

    const stateChanges = (
      !isEqual(nextState.internetConnection, state.internetConnection)
    );
    const propsChanges = (
      !isEqual(nextProps.nav, props.nav)
      || !isEqual(nextProps.weatherKey, props.weatherKey)
    );

    return stateChanges || propsChanges;
  }

  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectivityChange);
    DeviceEventEmitter.removeAllListeners('hardwareBackPress');
    this.backPressSubscriptions.clear();
  }

  handleConnectivityChange = internetConnection => this.setState({
    internetConnection,
  });

  hardwareBackPress = () => {
    let invokeDefault = true;
    const subscriptions = [];

    this.backPressSubscriptions.forEach(sub => subscriptions.push(sub));

    for (let i = 0; i < subscriptions.reverse().length; i += 1) {
      if (subscriptions[i]()) {
        invokeDefault = false;
        break;
      }
    }

    if (invokeDefault) {
      BackHandler.exitApp();
    }
  }

  handleHardwareBack = () => {
    const { dispatch, nav } = this.props;
    if (nav.index === 0) {
      return false;
    }
    dispatch(NavigationActions.back());
    return true;
  }

  render() {
    const {
      dispatch,
      nav: state,
      weatherKey,
      ...rest
    } = this.props;
    const { internetConnection } = this.state;
    return (
      <Fragment>
        <StatusBar
          barStyle={Platform.OS !== 'ios' ? 'light-content' : 'dark-content'}
          backgroundColor={HeaderStyle.backgroundColor}
          key="StatusBar"
        />
        <AppNavigator
          key="AppNavigator"
          screenProps={{
            weatherKey,
            ...rest,
          }}
          navigation={{
            dispatch,
            state,
            addListener,
          }}
        />
        <Modal
          animationType="slide"
          transparent={false}
          visible={!internetConnection}
          onRequestClose={() => {}}
        >
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Pulse size={this.width * 0.4} color="#d0a59c" />
            <Ionicons style={{ position: 'absolute' }} name="md-cloud-outline" size={this.width * 0.4} color="#644748" />
            <Ionicons style={{ position: 'absolute' }} name="md-close" size={this.width * 0.2} color="#644748" />
            <Text style={{ color: '#644748', fontSize: 19, fontWeight: 'bold' }}>NO INTERNET CONNECTION</Text>
          </View>
        </Modal>
      </Fragment>
    );
  }
}

AppWithNavigationState.propTypes = {
  dispatch: PropTypes.func.isRequired,
  nav: PropTypes.shape({
    index: PropTypes.number,
    isTransitioning: PropTypes.bool,
    key: PropTypes.string,
    routes: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
  weatherKey: PropTypes.string,
};

AppWithNavigationState.defaultProps = {
  weatherKey: null,
};

const mapStateToProps = ({
  nav, weather: { weatherKey },
}) => ({
  nav,
  weatherKey,
});

export default connect(mapStateToProps)(AppWithNavigationState);
