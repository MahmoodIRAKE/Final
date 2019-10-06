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



export default  class CreateShifts extends React.Component {
 state={JobsList:[],WorkerList:[],NextweekShifts:[],
   Days:[{name:'sunday'},{name:'monday'},{name:'tusday'},{name:'wednsDay'},{name:'thursday'},{name:'friday'},{name:'saturday'}],
   Points:'',
   Shifts:[{name:'Morning'},{name:'Night'}],
   finalShifts:{key:[[[''],['']],[[''],['']],[[''],['']],[[''],['']],[[''],['']],[[''],['']],[[''],['']]]}
}
  componentDidMount() {
    const {navigate} = this.props.navigation;
    const {navigation} = this.props;
    const user_name = navigation.getParam('name', 'NO-User');
    if(user_name!='No=User'){
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

}


     SortingWorkersList = ()=>{
       var worker1=''
       var worker=''
       var min=''
       var temp=''
       var check =0
       for(worker of this.state.WorkerList){
          min=worker
          for(worker1 of this.state.WorkerList){
               if(min.Points<worker1.Points){
                 min=worker1
               }
          }
          var i = this.state.WorkerList.indexOf(worker);
          var j = this.state.WorkerList.indexOf(min);
          temp = this.state.WorkerList[i];
          this.state.WorkerList[i] = min;
          this.state.WorkerList[j] = temp;
       }
     }

     SortingJobsList = (day)=>{
       var job1=''
       var job=''
       var min=''
       var temp=''
       var check =0
       for(job of this.state.JobsList){
          min=job
          for(job1 of this.state.JobsList){
               if(min[day]<job1[day])
                 min=job1
               }
          }
          var i = this.state.JobsList.indexOf(job);
          var j = this.state.JobsList.indexOf(min);
          temp = this.state.JobsList[i];
          this.state.JobsList[i] = min;
          this.state.JobsList[j] = temp;
       }


     StartData =()=>{
       const {navigate} = this.props.navigation;
       const {navigation} = this.props;
       const user_name = navigation.getParam('name', 'NO-User');
       var worker=''
       var job=''
       var day=''
       var shift=''

        this. SortingWorkersList()
        for(day of this.state.Days)  {
          firebase.database().ref(user_name).child('ShiftsForNextWeek').child(day.name).child('Holidays').set(
            {
              numberOfWorkers:0
            }
          )
            for(shift of this.state.Shifts)  {
                for (job of this.state.JobsList){
                  firebase.database().ref(user_name).child('ShiftsForNextWeek').child(day.name).child(shift.name).child(job.name).set(
                    {numberOfWorkers:0,
                    worker:'empty',
                    jobName:job.name}
                  )
              }
           }
         }

     }


startbuild =()=>
{
  this.StartData()
  var worker
  var job
  var day
  var shift=''
  var checker =0
  var job_day_strength=[]
  var requested_shift=''
  var worker_strength=[]
  var JobsCopy=[]
  var index=0
  var numberWorkers=0
  const {navigate} = this.props.navigation;
  const {navigation} = this.props;
  const user_name = navigation.getParam('name', 'NO-User');

  for(day of this.state.Days){
    this.SortingJobsList(day.name)
    console.log(this.state.JobsList[0])
     var CopyWorkerList=[...this.state.WorkerList];
      for(shift of this.state.Shifts)  {
        JobsCopy=[...this.state.JobsList];
          for(worker of CopyWorkerList){
            index=index+1
               for(job of JobsCopy){
         firebase.database().ref(user_name).child('Jobs').child(job.name).child(day.name).on('value', (snapshot) => {
              job_day_strength = snapshot.val();
           });

       firebase.database().ref(user_name).child('Workers').child(worker.name).child('NextWeekShifts').child(day.name).on('value', (snapshot) => {
              requested_shift = snapshot.val();
           });

         firebase.database().ref(user_name).child('Workers').child(worker.name).child('JobsStrength').child(job.name).child('Strength').on('value', (snapshot) => {
                 worker_strength = snapshot.val();
              });

           if(requested_shift == shift.name){
             if(job_day_strength <= worker_strength){
                 firebase.database().ref(user_name).child('ShiftsForNextWeek').child(day.name).child(shift.name).child(job.name).child('numberOfWorkers').on('value', (snapshot) => {
                        numberWorkers = snapshot.val();
                     });
                if(numberWorkers==0){
                firebase.database().ref(user_name).child('ShiftsForNextWeek').child(day.name).child(shift.name).child(job.name).update(
                  {
                    worker:worker.name
                  }
                )
                firebase.database().ref(user_name).child('ShiftsForNextWeek').child(day.name).child(shift.name).child(job.name).update({numberOfWorkers:1})

                //removing the job and the worker
                var i = JobsCopy.indexOf(job);
                var j = CopyWorkerList.indexOf(worker);
                JobsCopy.slice(i,1)
                CopyWorkerList.slice(j,1)
                break;
              }
              }
             }


      }
     }
   }
}
}

// function to check if everyone enterd shifts
allworkers=()=>{
  const {navigate} = this.props.navigation;
  const {navigation} = this.props;
  const user_name = navigation.getParam('name', 'NO-User');
  var day =''
  var worker =''
for(worker of this.state.WorkerList){
  for(day of this.state.Days){
  firebase.database().ref(user_name).child('Workers').child(worker.name).child('NextWeekShifts').child(day.name).on('value', (snapshot) => {
         requested_shift = snapshot.val();
      });
    if(requested_shift=='Shift'){
      return 'Not All Workers Deliverd'
    }
  }
}
return 'All Workers Delivered'
}



  render() {

    const {navigate} = this.props.navigation;
    const {navigation} = this.props;
    const user_name = navigation.getParam('name', 'NO-User');

    return (
      <ScrollView style={styles.container,{backgroundColor:'blue'}}>
      <View style={styles.container,{backgroundColor:'blue'}}>
      <Image
       style={{width: 100, height: 100,padding: 200}}
       source={require('../images/allImages.jpg')}
      />

      <Text style={styles.textIntro}>Please confirm To Start Creating The Shifts For This week</Text>
      <Text style={styles.textIntro}>{this.allworkers()}</Text>
      <Button
        title='Create Shifts For Next Week(Click Me)'
        onPress={this.startbuild}
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
 container: {
   flex: 1,
   justifyContent: 'center',
   alignItems: 'center'
 }

})
