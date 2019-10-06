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



export default  class ManajerSignUp extends React.Component {
 id=1
  state = {
    username: '', password: '', email: '', ResturantName: '', numWorkers:''
  }


  onChangeText = (key, val) => {
    this.setState({ [key]: val })
  }
  signUp = async () => {
    id=this.id
    const { username, password, email, ResturantName,numWorkers } = this.state
    firebase.database().ref(this.state.username+this.state.ResturantName).set(
              {
                  name: this.state.username,
                  password: this.state.password,
                  email: this.state.email,
                  ResturantName: this.state.ResturantName,
                  numWorkers:this.state.numWorkers,
                  ResturantID:this.state.username+this.state.ResturantName,
                  UserKind:'Manager'

              }
          )
          this.id=id+1
  }


  render() {
    return (
      <View style={styles.container}>
        <Text>Manager Sign Up</Text>
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
          placeholder='Resturant Name'
          autoCapitalize="none"
          placeholderTextColor='white'
          onChangeText={val => this.onChangeText('ResturantName', val)}
        />
        <TextInput
          style={styles.input}
          placeholder='worker Number'
          autoCapitalize="none"
          placeholderTextColor='white'
          onChangeText={val => this.onChangeText('numWorkers', val)}
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
