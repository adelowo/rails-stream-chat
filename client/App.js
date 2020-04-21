import React, {Component} from 'react';
import {Alert, StyleSheet, View, SafeAreaView} from 'react-native';
import {StreamChat} from 'stream-chat';
import Auth from './Auth';
import Chat from './Chat';
import axios from 'axios';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isAuthenticated: false,
      id: '',
    };

    this.chatClient = new StreamChat('u8x26aqytmec');
  }

  onLoginCallBack = user => {
    if (user.moniker.length === 0) {
      Alert.alert('Login', 'Please provide your moniker');
      return;
    }

    if (user.password.length === 0) {
      Alert.alert('Login', 'Please provide your password');
      return;
    }

    const data = {
      user: {
        ...user,
      },
    };

    axios
      .post('http://localhost:3000/users/', data, {
        headers: {Authorization: 'ieueojdkdj39fkddd'},
      })
      .then(res => {
        console.log(res.data);

        if (res.data.token === '') {
          Alert.alert('Login', 'Error occurred while authenticating you');
          return;
        }

        this.chatClient.setUser(
          {
            id: res.data.user.moniker,
            username: res.data.user.moniker,
            image:
              'https://stepupandlive.files.wordpress.com/2014/09/3d-animated-frog-image.jpg',
          },
          res.data.token
        );
        this.setState({
          isAuthenticated: true,
          id: res.data.user._id,
        });
      })
      .catch(err => {
        console.log(err);
        Alert.alert('Login', 'Could not log you in');
      });
  };

  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <View style={{flex: 1}}>
          {!this.state.isAuthenticated || this.state.currentUser === null ? (
            <View style={styles.container}>
              <Auth cb={this.onLoginCallBack} />
            </View>
          ) : (
            <View style={[{flex: 1}]}>
              <Chat userID={this.state.id} chatClient={this.chatClient} />
            </View>
          )}
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
