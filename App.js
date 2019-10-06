import React from 'react'
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import LogIn from './CommonPages/LogIn';
import ShowingShifts from './CommonPages/ShowingShifts';

import WorkerVsManager from './CommonPages/WorkerVsManager';
import CreateAjob from './ManagerPages/CreateAjob';
import CreateRequestsFromManager from './ManagerPages/CreateRequestsFromManager';
import CreateShifts from './ManagerPages/CreateShifts';
import DeletePage from './ManagerPages/DeletePage';
import GradingWorkersPart1 from './ManagerPages/GradingWorkersPart1';
import GradingWorkersPart2 from './ManagerPages/GradingWorkersPart2';
import ManagerSignUp from './ManagerPages/ManagerSignUp';
import PutManualyAWorker from './ManagerPages/PutManualyAWorker';
import MangerFirstPage from './ManagerPages/MangerFirstPage';
import CheckRequestForManger from './ManagerPages/CheckRequestForManger';
import CreateSwitchShiftRequest from './WorkersPages/CreateSwitchShiftRequest';
import EnterRequestedShifts from './WorkersPages/EnterRequestedShifts';
import RecivedRequests from './WorkersPages/RecivedRequests';
import WorkerProfile from './WorkersPages/WorkerProfile';
import WorkerSignup from './WorkersPages/WorkerSignup';

import {
  View,
  Button,
  TextInput,
  StyleSheet,
  Image,
  Text,
} from 'react-native'


class App extends React.Component {



  render() {

    return <AppContainer/>
  }
}

const MainNavigator = createStackNavigator({
  LogIn:LogIn,
  WorkerVsManager:WorkerVsManager,
  LogIn:LogIn,
  CreateAjob:CreateAjob,
  CreateRequestsFromManager:CreateRequestsFromManager,
  CreateShifts:CreateShifts,
  DeletePage:DeletePage,
  GradingWorkersPart1:GradingWorkersPart1,
  GradingWorkersPart2:GradingWorkersPart2,
  ManagerSignUp:ManagerSignUp,
  MangerFirstPage:MangerFirstPage,
  CreateSwitchShiftRequest:CreateSwitchShiftRequest,
  EnterRequestedShifts:EnterRequestedShifts,
  RecivedRequests:RecivedRequests,
  WorkerProfile:WorkerProfile,
  WorkerSignup:WorkerSignup,
  ShowingShifts:ShowingShifts,
  CheckRequestForManger:CheckRequestForManger,
  PutManualyAWorker:PutManualyAWorker
}
);

const AppContainer = createAppContainer(MainNavigator);

export default AppContainer;



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
