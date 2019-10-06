import React from 'react';
import  firebase from 'firebase';
import {
  View,
  Button,
  TextInput,
  StyleSheet,
  Image,
} from 'react-native';
// import firebase from 'firebase';

const firebaseConfig={
  apiKey: "AIzaSyCDh998mIGLdyHaE3EK5tRnhLY-I7jiPOY",
  authDomain: "shiftorgnaizer.firebaseapp.com",
  databaseURL: "https://shiftorgnaizer.firebaseio.com",
  storageBucket: ""
};
//firebase.initializeApp(firebaseConfig);



export default class WorkerSignup extends React.Component {
  state = {
    username: '', password: '', email: '', ResturantID: ''
  }
  onChangeText = (key, val) => {
    this.setState({ [key]: val })
  }
  signUp = async () => {
    let id=this.state.ResturantID

    const { username, password, email, ResturantID } = this.state
    firebase.database().ref(this.state.ResturantID).child('Workers').child(this.state.username).set(
              {
                  name: this.state.username,
                  password: this.state.password,
                  email: this.state.email,
                  ResturantID: this.state.ResturantID,
                  Points: 10,
                  UserKind:'Worker'

              }
          )
    firebase.database().ref('Workers').child(this.state.username).set(
                    {
                        name: this.state.username,
                        password: this.state.password,
                        email: this.state.email,
                        ResturantID: this.state.ResturantID,
                        Points: 10,
                        UserKind:'Worker'


                    }
                )

  }


  render() {
    return (
      <View style={styles.container}>

        <TextInput
          style={styles.input}
          placeholder='Username'
          autoCapitalize="none"
          placeholderTextColor='white'
          onChangeText={val => this.onChangeText('username', val)}
        />
        <TextInput
          style={styles.input}
          placeholder='Password'
          secureTextEntry={true}
          autoCapitalize="none"
          placeholderTextColor='white'
          onChangeText={val => this.onChangeText('password', val)}
        />
        <TextInput
          style={styles.input}
          placeholder='Email'
          autoCapitalize="none"
          placeholderTextColor='white'
          onChangeText={val => this.onChangeText('email', val)}
        />
        <TextInput
          style={styles.input}
          placeholder='Resturant ID'
          autoCapitalize="none"
          placeholderTextColor='white'
          onChangeText={val => this.onChangeText('ResturantID', val)}
        />


        <Button
          title='Sign Up'
          onPress={this.signUp}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  input: {
    width: 350,
    height: 55,
    backgroundColor: '#42A5F5',
    margin: 10,
    padding: 8,
    color: 'white',
    borderRadius: 14,
    fontSize: 18,
    fontWeight: '500',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
