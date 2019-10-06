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
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
// import firebase from 'firebase';

const firebaseConfig={
  apiKey: "AIzaSyCDh998mIGLdyHaE3EK5tRnhLY-I7jiPOY",
  authDomain: "shiftorgnaizer.firebaseapp.com",
  databaseURL: "https://shiftorgnaizer.firebaseio.com",
  storageBucket: ""
};
//firebase.initializeApp(firebaseConfig);



export default class MangerFirstPage extends React.Component {

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
       <Text style={styles.textIntro}>You Resturant Id Is Your User NAME</Text>
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
          title='Create Next Week Shifts'
          onPress={() => navigate('CreateShifts', {name: user_name})}
               />
        </View>

        <View style={styles.container}>
        <Button
          style={styles.button}
          title='Check Requests'
          onPress={() => navigate('CheckRequestForManger', {name: user_name})}
               />
        </View>

        <View style={styles.container}>
        <Button
          style={styles.button}
          title='Create Request'
          onPress={() => navigate('CreateRequestsFromManager', {name: user_name})}
               />
        </View>

        <View style={styles.container}>
        <Button
          style={styles.button}
          title='Update Info'
          onPress={() => navigate('GradingWorkersPart1', {name: user_name})}
               />
        </View>

        <View style={styles.container}>
        <Button
          style={styles.button}
          title='Remove Workers/Jobs'
          onPress={() => navigate('DeletePage', {name: user_name})}
               />
        </View>

        <View style={styles.container}>
        <Button
          style={styles.button}
          title='Add Workers Manualy'
          onPress={() => navigate('PutManualyAWorker', {name: user_name})}
               />
        </View>
          <View style={styles.container}>
               <Button
                 style={styles.button}
                 title='Create A job'
                 onPress={() => navigate('CreateAjob', {name: user_name})}
            />
        </View>
        <View style={styles.container}>
             <Button
               style={styles.button}
               title='Sign Out'
               onPress={() => navigate('LogIn', {nsme:''})}
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
