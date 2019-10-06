import React from 'react';
import  firebase from 'firebase';
import {
  View,
  Button,
  TextInput,
  StyleSheet,
  Image,
  Text,
  ScrollView
} from 'react-native';
// import firebase from 'firebase';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

const firebaseConfig={
  apiKey: "AIzaSyCDh998mIGLdyHaE3EK5tRnhLY-I7jiPOY",
  authDomain: "shiftorgnaizer.firebaseapp.com",
  databaseURL: "https://shiftorgnaizer.firebaseio.com",
  storageBucket: ""
};
//firebase.initializeApp(firebaseConfig);



export default class WorkerProfile extends React.Component {

  Action = async () => {

  }


  render() {
    const {navigate} = this.props.navigation;
    const {navigation} = this.props;
    const user_name = navigation.getParam('name', 'NO-User');
    return (
      <ScrollView style={{backgroundColor:'blue'}}>
      <Image
       style={{width: 100, height: 100,padding: 200}}
       source={require('../images/allImages.jpg')}
      />
      <View style={styles.container}>
      <Text style={styles.textIntro}>Welcome To Your Page Mr</Text>

      <Text style={styles.textIntro}>{user_name}</Text>
    
      </View>
        <View style={styles.container}>
        <Button
          style={styles.button}
          title='This Week Shifts'
          onPress={() => navigate('ShowingShifts', {name: user_name})}
               />
        </View>



        <View style={styles.container}>
        <Button
          style={styles.button}
          title='Check Requests'
          onPress={() => navigate('RecivedRequests', {name: user_name})}
               />
        </View>

        <View style={styles.container}>
        <Button
          style={styles.button}
          title='Switch Shifts'
          onPress={() => navigate('CreateSwitchShiftRequest', {name: user_name})}
               />
        </View>

        <View style={styles.container}>
        <Button
          style={styles.button}
          title='Enter Next Week Shifts'
          onPress={() => navigate('EnterRequestedShifts', {name: user_name})}
               />
        </View>
        <View style={styles.container}>
        <Button
          style={styles.button}
          title='Sign Out'
          onPress={() => navigate('LogIn', {name:''})}
               />
        </View>





      </ScrollView>
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
    justifyContent: 'center'
  },
  button:{
    flex: 1,
    paddingTop:20,
    backgroundColor:'black'

  },
  textIntro:{
    margin:40,
    color: 'black',
    backgroundColor: '#42A5F5',
    textAlign: 'center',
    fontSize: 18
  }

})
