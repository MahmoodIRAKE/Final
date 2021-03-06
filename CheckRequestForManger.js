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



 export default class RecivedRequests extends React.Component {
 state={RequestList:[],user_name:'',WorkerList:[],workerSelcted:' '}
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
  RequestListFunc=()=>{
    const {navigate} = this.props.navigation;
    const {navigation} = this.props;
    const user_name = navigation.getParam('name', 'NO-User');

    firebase.database().ref(user_name).child('Workers').child(this.state.workerSelcted).child('RecivedSwitchRequests').on('value', (snapshot) => {
        let data = snapshot.val();
        let RequestList = Object.values(data);
        this.setState({RequestList});
     });

  }

   agreed = (val) => {
     const {navigate} = this.props.navigation;
     const {navigation} = this.props;
     const user_name = navigation.getParam('name', 'NO-User');
     firebase.database().ref(user_name).child('Workers').child(this.state.workerSelcted).child('RecivedSwitchRequests').child(val).update(
       {'ApprovedbyManger':1}
     )
     //addin remove request after updating shifts
  }
  disagreed = (val) => {
    const {navigate} = this.props.navigation;
    const {navigation} = this.props;
    const user_name = navigation.getParam('name', 'NO-User');
    firebase.database().ref(user_name).child('Workers').child(this.state.workerSelcted).child('RecivedRequests').child(val).remove()
    // Specify Fro deleting The Child Onlye
 }
onValueChange=(itemValue, itemIndex)=>{
  this.setState({workerSelcted: itemValue})
  this.RequestListFunc()
}

  render() {


    return (
      <ScrollView style={{backgroundColor:'blue'}}>
      <Image
       style={{width: 100, height: 100,padding: 200}}
       source={require('../images/allImages.jpg')}
      />

      <Text style={styles.textIntro}>Please choose Worker To See His Request List</Text>
      <Picker
          selectedValue={this.state.workerSelcted}
          style={styles.textIntro}
          dataSource={this.state.WorkerList}
          onValueChange={(itemValue, itemInde)=>{this.onValueChange()}}
          >
          {this.state.WorkerList.map(item => (
              <Picker.Item  label={item.name} value={item.name} />
          ))}
          </Picker>

      <FlatList style={styles.container}

        data={this.state.RequestList}
        renderItem={({item})=>{
          return(

           <View style={styles.container,{borderColor:'red',borderBottomWidth:2,borderTopWidth:2}}>
           <View style={styles.container}>
             <Text style={styles.header}>this request is from {item.RequestFrom}</Text>
             </View>
            <Text style={styles.textRequest}>{item.Text}</Text>
            <Button
              style={{margin: 10}}
              title='Agreed'
              onPress={()=>this.agreed(item.RequestName)}
            />
            <Button
              style={{margin: 10}}
              title='DisAgreed'
              onPress={()=>this.disagreed(item.RequestName)}
            />

          </View>
        )}}
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
 textRequest:{
  flex:1,
  justifyContent: 'center',
  alignItems: 'center',
  fontSize:14,
  margin:10,
}

})
