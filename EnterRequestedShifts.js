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



export default class EnterRequestedShifts extends React.Component {
 state={JobsList:[],WorkerList:[],requestname:'SwitchShifts',
  sunday:'',monday:'',tusday:'',wednsday:'',thursday:'',friday:'',saturday:'',
   Shifts:[{name:'Shift'},{name:'Morning'},{name:'Night'},{name:'Holiday'}],
   father:''
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

  createRequest = () => {
    const {navigate} = this.props.navigation;
    const {navigation} = this.props;
    const user_name = navigation.getParam('name', 'NO-User');
    firebase.database().ref(this.state.father).child('Workers').child(user_name).child('NextWeekShifts').set(
      {
         sunday:this.state.sunday,
         monday:this.state.monday,
         tusday:this.state.tusday,
         wednsday:this.state.wednsday,
         thursday:this.state.thursday,
         friday:this.state.friday,
         saturday:this.state.saturday
      }
    )
 }






  render() {

    return (
      <ScrollView style={{backgroundColor:'blue'}}>
      <Image
       style={{width: 100, height: 100,padding: 200}}
       source={require('../images/allImages.jpg')}
      />
      <View>
      <Text style={styles.textIntro}>Plaese Chooose Next Week Shifts</Text>


      <Text>Sunday+Date</Text>
      <Picker
          selectedValue={this.state.sunday}
          style={styles.textIntro}
          dataSource={this.state.Shifts}
          onValueChange={(itemValue, itemIndex) =>this.setState({sunday: itemValue})}
          >
          {this.state.Shifts.map(item => (
              <Picker.Item  label={item.name} value={item.name} />
          ))}
          </Picker>
       <Text>Monday+Date</Text>
          <Picker
              selectedValue={this.state.monday}
              style={styles.textIntro}
              dataSource={this.state.Shifts}
              onValueChange={(itemValue, itemIndex) =>this.setState({monday: itemValue})}
              >
              {this.state.Shifts.map(item => (
                  <Picker.Item  label={item.name} value={item.name} />
              ))}
              </Picker>
        <Text>Tusday+Date</Text>
              <Picker
              selectedValue={this.state.tusday}
              style={styles.textIntro}
              dataSource={this.state.Shifts}
              onValueChange={(itemValue, itemIndex) =>this.setState({tusday: itemValue})}
              >
              {this.state.Shifts.map(item => (
              <Picker.Item  label={item.name} value={item.name} />
               ))}
               </Picker>
         <Text>Wednsday+Date</Text>
          <Picker
            selectedValue={this.state.wednsday}
            style={styles.textIntro}
            dataSource={this.state.Shifts}
            onValueChange={(itemValue, itemIndex) =>this.setState({wednsday: itemValue})}
                            >
          {this.state.Shifts.map(item => (
          <Picker.Item  label={item.name} value={item.name} />
            ))}
      </Picker>
      <Text>Thursday+Date</Text>
     <Picker
     selectedValue={this.state.thursday}
     style={styles.textIntro}
     dataSource={this.state.Shifts}
     onValueChange={(itemValue, itemIndex) =>this.setState({thursday: itemValue})}
     >
    {this.state.Shifts.map(item => (
    <Picker.Item  label={item.name} value={item.name} />
     ))}
    </Picker>
      <Text>Friday+Date</Text>
      <Picker
      selectedValue={this.state.friday}
      style={styles.textIntro}
      dataSource={this.state.Shifts}
      onValueChange={(itemValue, itemIndex) =>this.setState({friday: itemValue})}
      >
      {this.state.Shifts.map(item => (
      <Picker.Item  label={item.name} value={item.name} />
      ))}
      </Picker>
      <Text>Saturday+Date</Text>
        <Picker
          selectedValue={this.state.saturday}
          style={styles.textIntro}
          dataSource={this.state.Shifts}
          onValueChange={(itemValue, itemIndex) =>this.setState({saturday: itemValue})}
             >
          {this.state.Shifts.map(item => (
          <Picker.Item  label={item.name} value={item.name} />
          ))}
        </Picker>
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
