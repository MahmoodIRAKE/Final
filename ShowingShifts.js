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

const firebaseConfig={
  apiKey: "AIzaSyCDh998mIGLdyHaE3EK5tRnhLY-I7jiPOY",
  authDomain: "shiftorgnaizer.firebaseapp.com",
  databaseURL: "https://shiftorgnaizer.firebaseio.com",
  storageBucket: ""
};
//firebase.initializeApp(firebaseConfig);

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

export default class ShowingShifts extends React.Component {
 state={JobsList:[],WorkerList:[],NextweekShifts:[],selected:'sunday',currentJob:'',
   Days:[{name:'sunday'},{name:'monday'},{name:'tusday'},{name:'wednsDay'},{name:'thursday'},{name:'friday'},{name:'saturday'}],

   Points:'',
   Shifts:[{name:'Morning'},{name:'Night'}],
   FinalShifts:[],FinalShiftsNight:[]
}
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
    firebase.database().ref(user_name).child('ShiftsForNextWeek').child(this.state.selected).child('Morning').on('value', (snapshot) => {
        let data = snapshot.val();
        let FinalShifts = Object.values(data);
        this.setState({FinalShifts});
       });

}

onValueChange=(itemValue, itemIndex)=>{
  this.setState({selected: itemValue})
  var job
  var name=''
  for(job of this.state.JobsList){
    firebase.database().ref(user_name).child('ShiftsForNextWeek').child(this.state.selected).child('Morning').on('value', (snapshot) => {
        let data = snapshot.val();
        let FinalShifts = Object.values(data);
        this.setState({FinalShifts});
       });

 }
 for(job of this.state.JobsList){
   firebase.database().ref(user_name).child('ShiftsForNextWeek').child(this.state.selected).child('Night').on('value', (snapshot) => {
       let data = snapshot.val();
       let FinalShiftsNight = Object.values(data);
       this.setState({FinalShiftsNight});
      });

}

}





  render() {


    return (
      <ScrollView style={styles.container,{backgroundColor:'blue'}}>
      <Image
       style={{width: 100, height: 100,padding: 200}}
       source={require('../images/allImages.jpg')}
      />
      <Picker
          selectedValue={this.state.selected}
          style={styles.textIntro}
          dataSource={this.state.Days}
          onValueChange={(itemValue, itemIndex) =>this.onValueChange(itemValue, itemIndex)}
          >
          {this.state.Days.map(item => (
              <Picker.Item  label={item.name} value={item.name} />
          ))}
          </Picker>

           <Text style={styles.textIntro}>Morning Shifts</Text>


                  <FlatList
                    keyExtractor={FinalShifts=>{this.state.FinalShifts}}
                    data={this.state.FinalShifts}
                    renderItem={({item})=>{
                      return    (

                                 <View>

                                     <Text style={styles.textIntro2}>{item.jobName}</Text>

                                    <TextInput
                                      style={styles.input}
                                      placeholder={item.worker}
                                      autoCapitalize="none"
                                      placeholderTextColor='white'

                                    />
                                  </View>

                               );
                    }}

                  />
                  <Text style={styles.textIntro}>Night Shifts</Text>


                         <FlatList
                           keyExtractor={FinalShiftsNight=>{this.state.FinalShiftsNight}}
                           data={this.state.FinalShiftsNight}
                           renderItem={({item})=>{
                             return    (

                                        <View>

                                            <Text style={styles.textIntro2}>{item.jobName}</Text>

                                           <TextInput
                                             style={styles.input}
                                             placeholder={item.worker}
                                             autoCapitalize="none"
                                             placeholderTextColor='white'

                                           />
                                         </View>

                                      );
                           }}

                         />

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
 },
 container: {
   flex: 1,
   justifyContent: 'center',
   alignItems: 'center'
 },
 textIntro2:{
   margin:40,
   color: 'black',
   backgroundColor: '#42A5F5',
   textAlign: 'center',
   fontSize: 14
 },

})
