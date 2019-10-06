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



export default class GradingWorkersPart1 extends React.Component {
 state={JobsList:[]}
  componentDidMount() {
    const {navigate} = this.props.navigation;
    const {navigation} = this.props;
    const user_name = navigation.getParam('name', 'NO-User');
    firebase.database().ref(user_name).child('Jobs').on('value', (snapshot) => {
        let data = snapshot.val();
        let JobsList = Object.values(data);
        this.setState({JobsList});
     });
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
      <View >
         <View ><Text style={styles.textIntro}>Choose Each Job So You Can Specify Workers Strenght</Text></View>
        <FlatList style={styles.container}
          keyExtractor={JobsList=>{this.state.JobsList.WorkerName}}
          data={this.state.JobsList}
          renderItem={({item})=>{
            return  <Button style={styles.button} title={item.name} onPress={() => navigate('GradingWorkersPart2', {name: user_name,job:item.name})}/>
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
