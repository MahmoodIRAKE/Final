import React from 'react'
import {
  View,
  Button,
  TextInput,
  StyleSheet,
  Image,
  Text,
} from 'react-native'
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

export default class WorkerVsManager extends React.Component {



  render() {
    const {navigate} = this.props.navigation;
    const {navigation} = this.props;
    const user_name= navigation.getParam('name', 'NO-User');
    return (
      <View style={styles.container}>
        <Text style={styles.header}>What Are You ?</Text>
        <Image source={require('../images/worker.jpg')}
        style={{width: 250,height: 200,margin: 10}}/>
        <Button
          style={{margin: 7}}
          title='Worker'
          onPress={() => navigate('WorkerSignup', {name: user_name})}
        />
        <Image source={require('../images/manager.jpg')}
        style={{width: 250,height: 200,margin: 10}}/>
        <Button
          style={{margin: 7}}
          title='Manager'
          onPress={() => navigate('ManagerSignUp', {name: user_name})}
        />
      </View>
    )
  }
}




const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10
  },
  header: {
    color: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 24
  }

})
