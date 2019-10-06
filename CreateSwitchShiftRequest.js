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



export default  class CreateSwitchShiftRequest extends React.Component {
 state={JobsList:[],WorkerList:[],selectedPerson:'',selectedDay:'',selectedJob:'',text:'',requestname:'SwitchShifts',
  selectedRequesterShift:'',selectedReciverRequest:'',
   Days:[{name:'sunday'},{name:'monday'},{name:'tusday'},{name:'wednsday'},{name:'thursday'},{name:'friday'},{name:'saturday'}],
   Shifts:[{name:'Morning'},{name:'Night'},{name:'Holiday'}],father:''
}
  componentDidMount() {
    const {navigate} = this.props.navigation;
    const {navigation} = this.props;
    const user_name = navigation.getParam('name', 'NO-User');
    firebase.database().ref('Workers').child(user_name).child('ResturantID').on('value', (snapshot) =>
      {
        let data= snapshot.val();
        let father = Object.values(data);
        this.setState({father});
      } );
    firebase.database().ref(this.state.father).child('Jobs').on('value', (snapshot) => {
        let data = snapshot.val();
        let JobsList = Object.values(data);
        this.setState({JobsList});
     });
     firebase.database().ref(this.state.father).child('Workers').on('value', (snapshot) => {
         let data = snapshot.val();
         let WorkerList = Object.values(data);
         this.setState({WorkerList});
      });
  }
  onChangeText = (key, val) => {
    this.setState({ [key]: val })
  }
  // need to creat function to check if the switch is avalible
  createRequest = () => {
    firebase.database().ref(this.state.father).child('Workers').child(this.state.selectedPerson).child('RecivedSwitchRequests').child('mahmood'+'Switch With '+this.state.selectedPerson+'On'+this.state.selectedDay).set(
      {
        Text:'Can You Switch With Me',
        RequestName:'Switch With '+this.state.selectedPerson,
        SelectedDay:this.state.selectedDay,
        SelectedJob:this.state.selectedJob,
        RequsterShift:this.state.selectedRequesterShift,
        ReciverShift:this.state.selectedReciverRequest,
        ApprovedByWorker:0,
        ApprovedbyManger:0,
        RequestFrom:user_name
      }
    )
 }
 //function to chekc the ability to switch
CanSwitch=()=>{
    //After Authencation
}





  render() {

    return (
      <ScrollView style={{backgroundColor:'blue'}}>
      <Image
       style={{width: 100, height: 100,padding: 200}}
       source={require('../images/allImages.jpg')}
      />
      <View>
      <Text style={styles.textIntro}>Creat Switch Request</Text>


      <Text>Who You Will Switch With</Text>
      <Picker
          selectedValue={this.state.selectedPerson}
          style={styles.textIntro}
          dataSource={this.state.WorkerList}
          onValueChange={(itemValue, itemIndex) =>this.setState({selectedPerson: itemValue})}
          >
          {this.state.WorkerList.map(item => (
              <Picker.Item  label={item.name} value={item.name} />
          ))}
          </Picker>


        <Text>What Is The Job You Want</Text>
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


         <Text>please Choose Day</Text>
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
            <Text>please Choose His Shift</Text>
             <Picker
                 selectedValue={this.state.selectedReciverRequest}
                 style={styles.textIntro}
                 dataSource={this.state.Shifts}
                 onValueChange={(itemValue, itemIndex) =>this.setState({selectedReciverRequest: itemValue})}
                             >
                {this.state.Shifts.map(item => (
                <Picker.Item  label={item.name} value={item.name} />
                             ))}
               </Picker>
            <Text>please Choose You Shift</Text>
                <Picker
                    selectedValue={this.state.selectedRequesterShift}
                    style={styles.textIntro}
                    dataSource={this.state.Shifts}
                    onValueChange={(itemValue, itemIndex) =>this.setState({selectedRequesterShift: itemValue})}
                                >
                   {this.state.Shifts.map(item => (
                   <Picker.Item  label={item.name} value={item.name} />
                                ))}
                  </Picker>

          <Button
            title='Send Request'
            onPress={this.createRequest}
          />

          <Text style={styles.textIntro}>Notes About The Switch Request</Text>

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
