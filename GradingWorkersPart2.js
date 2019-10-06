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



 export default class GradingWorkersPart2 extends React.Component {
 state={WorkerList:[],Strength:''}
  componentDidMount() {
    const {navigate} = this.props.navigation;
    const {navigation} = this.props;
    const user_name = navigation.getParam('name', 'NO-User');
    firebase.database().ref(user_name).child('Workers').on('value', (snapshot) => {
        let data = snapshot.val();
        let WorkerList = Object.values(data);
        this.setState({WorkerList});
     });

  }

  onChangeText = (key, val) => {
    const {navigate} = this.props.navigation;
    const {navigation} = this.props;
    const user_name = navigation.getParam('name', 'NO-User');
    const { WorkerList,Strength } = this.state
    this.setState({ [key]: val })
    firebase.database().ref(user_name).child('Workers').child(key).child('JobsStrength').child('job').set(
              {
                  Strength:val
              }
          )

  }
  submit = async () => {

    const { WorkerList,Strength } = this.state
       //click to continue

  }



  render() {

    return (
      <ScrollView style={{backgroundColor:'blue'}}>
      <Image
       style={{width: 100, height: 100,padding: 200}}
       source={require('../images/allImages.jpg')}
      />
      <View >
         <View ><Text style={styles.textIntro}>Fill The Strength Of Each Worker</Text></View>




        <FlatList style={styles.container}
          keyExtractor={JobsList=>{this.state.WorkerList}}
          data={this.state.WorkerList}
          renderItem={({item})=>{
            return    (
                          <TextInput
                            style={styles.input}
                            placeholder={item.name}
                            autoCapitalize="none"
                            placeholderTextColor='white'
                            onChangeText={val => this.onChangeText(item.name, val)}
                          />
                     );
          }}

        />
        <Button style={styles.button} title='Submit'
         onPress={this.submit}
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
 },
 picker:{
   color: 'black',
justifyContent: 'center',
alignItems: 'center',
fontSize: 11.5,
margin:15 ,
backgroundColor:'blue'
 }

})
