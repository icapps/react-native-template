import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import * as loginActions from '../../redux/login/actions';
class Home extends React.Component {
  login = () => {
    this.props.login({
      email: 'reactnative@icapps.com',
      password: 'reactnative',
    });
  }
  render() {
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.lead}>A simple react native boilerplate with a login action.</Text>
          {this.props.token && <View style={styles.token}>
            <Text style={styles.tokenText}>You are now logged in. Your token: {this.props.token}</Text>
          </View>}
        </View>
        <TouchableOpacity style={styles.button} onPress={this.login}>
          <Text style={styles.buttonText}>Fire a login action!</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

Home.propTypes = {
  login: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  serverError: PropTypes.string,
  token: PropTypes.string,
};

Home.defaultProps = {
  serverError: null,
  token: null,
};

function mapStateToProps(state) {
  return {
    isLoading: state.login.isLoading,
    isLoggedIn: state.login.isLoggedIn,
    serverError: state.login.serverError,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    login: bindActionCreators(login, dispatch),
  };
}

export default connect(
  state => ({
    isLoading: state.login.isLoading,
    isLoggedIn: state.login.isLoggedIn,
    serverError: state.login.serverError,
    token: state.login.token,
  }),
  dispatch => ({
    login: bindActionCreators(loginActions.login, dispatch),
  }),
)(Home);

const styles = StyleSheet.create({
  container: {
    padding: 32,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    flex: 1,
  },
  lead: {
    textAlign: 'center',
  },
  button: {
    marginTop: 10,
    backgroundColor: 'rgb(255,45,85)',
    borderRadius: 3,
    padding: 10,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
  token: {
    borderRadius: 3,
    marginTop: 10,
    backgroundColor: 'rgb(0,122,255)',
    padding: 10,
  },
  tokenText: {
    color: 'white',
    textAlign: 'center',
  }
});
