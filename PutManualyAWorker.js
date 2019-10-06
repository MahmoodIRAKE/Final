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



 export default class PutManualyAWorker extends React.Component {
   state={JobsList:[],WorkerList:[],workerSelcted:'',selectedDay:'',selectedJob:'',selectedShift:'',
     Days:[{name:'sunday'},{name:'monday'},{name:'tusday'},{name:'wednsday'},{name:'thursday'},{name:'friday'},{name:'saturday'}],
     Shifts:[{name:'Morning'},{name:'Night'},{name:'Holiday'}]
   }
   componentDidMount(){

     const {navigate} = this.props.navigation;
     const {navigation} = this.props;
     const user_name = navigation.getParam('name', 'NO-User');

    if(user_name!=''){
      firebase.database().ref(user_name).child('Workers').on('value', (snapshot) => {
          let data = snapshot.val();
          let WorkerList = Object.values(data);
          this.setState({WorkerList});
       });
       firebase.database().ref(user_name).child('Jobs').on('value', (snapshot) => {
           let data = snapshot.val();
           let JobsList = Object.values(data);
           this.setState({JobsList});
        });
   }
 }
   GetWorkerToJob=()=>{
     firebase.database().ref(this.state.user_name).child('ShiftsForNextWeek').child(this.state.selectedDay).child(this.state.selectedShift).
     child(this.state.selectedJob).update({worker:this.state.workerSelcted});
   }



  render() {


    return (
      <ScrollView style={{backgroundColor:'blue'}}>
      <Image
       style={{width: 100, height: 100,padding: 200}}
       source={require('../images/allImages.jpg')}
      />

      <Text style={styles.textIntro}>Please choose Worker</Text>
      <Picker
          selectedValue={this.state.workerSelcted}
          style={styles.textIntro}
          dataSource={this.state.WorkerList}
          onValueChange={(itemValue, itemIndex) =>this.setState({selected: itemValue})}
          >
          {this.state.WorkerList.map(item => (
              <Picker.Item  label={item.name} value={item.name} />
          ))}
          </Picker>
          <Text style={styles.textIntro}>Please choose Day</Text>
          <Picker
              selectedValue={this.state.selectedDay}
              style={styles.textIntro}
              dataSource={this.state.Days}
              onValueChange={(itemValue, itemIndex) =>this.setState({selectedDay: itemValue})}
              >
              {this.state.Days.map(item => (
                  <Picker.Item  label={item.name} value={item.name} />
              ))}
              </Picker>
          <Text style={styles.textIntro}>Please Choose Job</Text>
              <Picker
                  selectedValue={this.state.selectedJob}
                  style={styles.textIntro}
                  dataSource={this.state.JobsList}
                  onValueChange={(itemValue, itemIndex) =>this.setState({selectedJob: itemValue})}
                  >
                  {this.state.JobsList.map(item => (
                      <Picker.Item  label={item.name} value={item.name} />
                  ))}
                  </Picker>
                  <Text style={styles.textIntro}>Please Choose Shift</Text>
                      <Picker
                          selectedValue={this.state.selectedShift}
                          style={styles.textIntro}
                          dataSource={this.state.Shifts}
                          onValueChange={(itemValue, itemIndex) =>this.setState({selectedShift: itemValue})}
                          >
                          {this.state.Shifts.map(item => (
                              <Picker.Item  label={item.name} value={item.name} />
                          ))}
                          </Picker>

           <View>
            <Button
              style={{margin: 10}}
              title='Insert Worker'
              onPress={()=>this.GetWorkerToJob()}
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
 },
 textRequest:{
  flex:1,
  justifyContent: 'center',
  alignItems: 'center',
  fontSize:14,
  margin:10,
}

})
