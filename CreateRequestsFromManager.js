import React from 'react';
import  firebase from 'firebase';
import {
  View,
  Button,
  TextInput,
  StyleSheet,
  Image,
  FlatList,
  Text,
  Picker,
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



export default  class CreateRequestsFromManager extends React.Component {
 state={JobsList:[],WorkerList:[],selected:'',text:'',requestname:''}
  componentDidMount() {
    const {navigate} = this.props.navigation;
    const {navigation} = this.props;
    const user_name = navigation.getParam('name', 'NO-User');
    firebase.database().ref(user_name).child('Jobs').on('value', (snapshot) => {
        let data = snapshot.val();
        let JobsList = Object.values(data);
        this.setState({JobsList});
     });
     firebase.database().ref(user_name).child('Workers').on('value', (snapshot) => {
         let data = snapshot.val();
         let WorkerList = Object.values(data);
         this.setState({WorkerList});
      });
  }
  onChangeText = (key, val) => {
    this.setState({ [key]: val })
  }
  createRequest = () => {
    const {navigate} = this.props.navigation;
    const {navigation} = this.props;
    const user_name = navigation.getParam('name', 'NO-User');
    firebase.database().ref(user_name).child('Workers').child(this.state.selected).child('RecivedRequests').child(this.state.requestname).set(
      {
        Text:this.state.text,
        RequestName:this.state.requestname,
        ApprovedByWorker:0,
        ApprovedbyManger:1,
        RequestFrom:user_name
      }
    )
 }






  render() {

    return (
      <ScrollView>
      <View>
      <Text style={styles.textIntro}>Creat Request</Text>
      <Image
       style={{width: 100, height: 100,padding: 200}}
       source={require('../images/allImages.jpg')}
      />

      <Text>Choose The Reciver</Text>
      <Picker
          selectedValue={this.state.selected}
          style={styles.textIntro}
          dataSource={this.state.WorkerList}
          onValueChange={(itemValue, itemIndex) =>this.setState({selected: itemValue})}
          >
          {this.state.WorkerList.map(item => (
              <Picker.Item  label={item.name} value={item.name} />
          ))}
          </Picker>

          <TextInput
            style={styles.input}
            placeholder='What Is This About'
            autoCapitalize="none"
            placeholderTextColor='white'
            onChangeText={val => this.onChangeText('requestname', val)}
          />

          <TextInput
            style={styles.input,{Width:350,height:150,backgroundColor: '#42A5F5',padding:15}}
            placeholder='Fill Yor Request Here'
            autoCapitalize="none"
            placeholderTextColor='white'
            onChangeText={val => this.onChangeText('text', val)}
          />

          <Button
            title='Send Request'
            onPress={this.createRequest}
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
  picker: {
    margin:40,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 70,
    width: 150
  },
 textIntro:{
   margin:40,
   color: 'black',
   backgroundColor: '#42A5F5',
   textAlign: 'center',
   fontSize: 18
 }

})
