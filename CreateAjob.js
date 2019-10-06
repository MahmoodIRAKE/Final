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

const firebaseConfig={
  apiKey: "AIzaSyCDh998mIGLdyHaE3EK5tRnhLY-I7jiPOY",
  authDomain: "shiftorgnaizer.firebaseapp.com",
  databaseURL: "https://shiftorgnaizer.firebaseio.com",
  storageBucket: ""
};
//firebase.initializeApp(firebaseConfig);


export default class CreateAjob extends React.Component {
  state = {
    JobName: '', minStrenght: '', numOfWorkers: '', ResturantID: '',
    Sunday:'',Monday:'',TusDay:'',Wedensday:'',Thursday:'',Friday:'',Saturday:''
  }
  onChangeText = (key, val) => {
    this.setState({ [key]: val })
  }
  createAjob = async () => {
    let id=this.state.ResturantID
    const {navigate} = this.props.navigation;
    const {navigation} = this.props;
    const user_name = navigation.getParam('name', 'NO-User');

    const { username, password, email, ResturantID,Sunday,Monday,TusDay,Wedensday,Thursday,Friday,Saturday } = this.state
    firebase.database().ref(this.state.ResturantID).child('Jobs').child(this.state.JobName).set(
              {
                  name: this.state.JobName,
                  minStrenght: this.state.minStrenght,
                  numOfWorkers: this.state.numOfWorkers,
                  ResturantID: this.state.ResturantID,
                  sunday:this.state.Sunday,
                  monday:this.state.Monday,
                  tusDay:this.state.TusDay,
                  wednsday:this.state.Wedensday,
                  thursday:this.state.Thursday,
                  friday:this.state.Friday,
                  saturday:this.state.Saturday

              }
          )

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
        <Text>This page Is To Create Jobs You Have In Your Resturant</Text>
        </View>
        <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder='Job Name'
          autoCapitalize="none"
          placeholderTextColor='white'
          onChangeText={val => this.onChangeText('JobName', val)}
        />
        <TextInput
          style={styles.input}
          placeholder='miniumim Strenght'
          autoCapitalize="none"
          placeholderTextColor='white'
          onChangeText={val => this.onChangeText('minStrenght', val)}
        />
        <TextInput
          style={styles.input}
          placeholder='Number Of Workers Needed'
          autoCapitalize="none"
          placeholderTextColor='white'
          onChangeText={val => this.onChangeText('numOfWorkers', val)}
        />
        <TextInput
          style={styles.input}
          placeholder='Resturant ID'
          autoCapitalize="none"
          placeholderTextColor='white'
          onChangeText={val => this.onChangeText('ResturantID', val)}
        />

        <Text>Please Enter From 1- 10 How Hard working in each day </Text>
        <TextInput
          style={styles.input}
          placeholder='Sunday'
          autoCapitalize="none"
          placeholderTextColor='white'
          onChangeText={val => this.onChangeText('Sunday', val)}
        />
        <TextInput
          style={styles.input}
          placeholder='Monday'
          autoCapitalize="none"
          placeholderTextColor='white'
          onChangeText={val => this.onChangeText('Monday', val)}
        />
        <TextInput
          style={styles.input}
          placeholder='TusDay'
          autoCapitalize="none"
          placeholderTextColor='white'
          onChangeText={val => this.onChangeText('TusDay', val)}
        />
        <TextInput
          style={styles.input}
          placeholder='Wedensday'
          autoCapitalize="none"
          placeholderTextColor='white'
          onChangeText={val => this.onChangeText('Wedensday', val)}
        />
        <TextInput
          style={styles.input}
          placeholder='Thursday'
          autoCapitalize="none"
          placeholderTextColor='white'
          onChangeText={val => this.onChangeText('Thursday', val)}
        />
        <TextInput
          style={styles.input}
          placeholder='Friday'
          autoCapitalize="none"
          placeholderTextColor='white'
          onChangeText={val => this.onChangeText('Friday', val)}
        />
        <TextInput
          style={styles.input}
          placeholder='Saturday'
          autoCapitalize="none"
          placeholderTextColor='white'
          onChangeText={val => this.onChangeText('Saturday', val)}
        />

        <Button
          title='Create A Job'
          onPress={this.createAjob}
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'blue'
  }
})
