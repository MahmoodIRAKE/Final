import React from 'react'
import  firebase from 'firebase'
import {
  View,
  Button,
  TextInput,
  StyleSheet,
  Image,
} from 'react-native'
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
const firebaseConfig={
  apiKey: "AIzaSyCDh998mIGLdyHaE3EK5tRnhLY-I7jiPOY",
  authDomain: "shiftorgnaizer.firebaseapp.com",
  databaseURL: "https://shiftorgnaizer.firebaseio.com",
  storageBucket: ""
};
firebase.initializeApp(firebaseConfig);

export default class LogIn extends React.Component {
  state = {
    username: '', password: '',ResturantID:'',
    worker:'',manger:''
  }
  onChangeText = (key, val) => {
    this.setState({ [key]: val })
  }
  // WorkerOrManger=()=>
  // {

  //    if(firebase.database().ref().child('Workers')){
  //    if(firebase.database().ref('Workers').child(this.state.username).child('UserKind').getValue()=='Worker'){
  //      return'WorkerProfile'
  //    }
  //  }
  //    if(firebase.database().ref(this.state.username).child('UserKind').getValue()=='Manager'){
  //      return'MangerFirstPage'
  //    }
  //
  //       alert('You Are Not Signed Up')
  //
  // }




logIn = async () => {
  const { username, password} = this.state
  try {



  } catch (err) {
    console.log('error LOGING IN: ', err)
  }
}
onChangeText = (key, val) => {
  this.setState({ [key]: val })

}
  render() {
    const {navigate} = this.props.navigation;
    return (
      <View style={styles.container}>
        <Image source={require('../images/allImages.jpg')}
        style={{width: 150,height: 100}}/>
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

         <Button
           title='Log in Worker'
           onPress={() => navigate('WorkerProfile', {name:this.state.username})}
         />
         <Button
           title='Log in Manager'
           onPress={() => navigate('MangerFirstPage', {name:this.state.username})}
         />

        <Button
          title='SignUp'
          onPress={() => navigate('WorkerVsManager', {name: this.state.username})}
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
