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
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';


export default class DeletePage extends React.Component {
 state={JobsList:[],WorkerList:[]}
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
  delete = (text) => {
    const {navigate} = this.props.navigation;
    const {navigation} = this.props;
    const user_name = navigation.getParam('name', 'NO-User');
    const { username, password, email, ResturantName,numWorkers } = this.state
  
    firebase.database().ref(user_name).child('Workers').child(text).remove()
 }
 deletejob = (text) => {
   const {navigate} = this.props.navigation;
   const {navigation} = this.props;
   const user_name = navigation.getParam('name', 'NO-User');
   const { username, password, email, ResturantName,numWorkers } = this.state
   firebase.database().ref(user_name).child('Jobs').child(text).remove()
}





  render() {

    return (
      <ScrollView style={{backgroundColor:'blue'}}>
      <Image
       style={{width: 100, height: 100,padding: 200}}
       source={require('../images/allImages.jpg')}
      />
      <View >
         <View ><Text style={styles.textIntro}>Choose A jov You  Want To Delete</Text></View>
        <FlatList style={styles.container}
          keyExtractor={JobsList=>{this.state.JobsList.WorkerName}}
          data={this.state.JobsList}
          renderItem={({item})=>{
            return  <Button style={styles.button} title={item.name} onPress={()=>this.deletejob(item.name)}/>
          }}
        />

        <View ><Text style={styles.textIntro}>Choose A Worker You Want To Remove</Text></View>
       <FlatList style={styles.container}
         keyExtractor={WorkerList=>{this.state.WorkerList.name}}
         data={this.state.WorkerList}
         renderItem={({item})=>{
           return  <Button style={styles.button} title={item.name} onPress={()=>this.delete(item.name)}/>
         }}
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
    margin:40
  },
 textIntro:{
   margin:40,
   color: 'black',
   backgroundColor: '#42A5F5',
   textAlign: 'center',
   fontSize: 18
 }

})
