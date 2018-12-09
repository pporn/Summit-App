import React, { Component } from 'react';
import { Route, Switch } from "react-router-dom";

import './App.css';
import 'react-bootstrap-typeahead/css/Typeahead.css';

import MainMenu from './components/MainMenu/MainMenuContainer.jsx';
import GymInformation from './components/GymInformation/GymInformationContainer.jsx';
import ClientCheckIn from './components/ClientCheckIn/ClientCheckIn.jsx';
import ClientLoginContainer from './components/ClientLogin/ClientLoginContainer.jsx';
import ClientAccount from './components/ClientAccount/ClientAccountContainer.jsx';
import NewClientFormRedirect from './components/NewClientFormRedirect/NewClientFormRedirectContainer.jsx';
import ClientRegistration from './components/ClientRegistration/ClientRegistration.jsx';
import MedicalQuestionnaire from './components/MedicalQuestionnaire/MedicalQuestionnaire.jsx'
import EmployeePage from './components/EmployeePage/EmployeePageContainer.jsx';
import AlertManagement from './components/AlertManagement/AlertManagementContainer.jsx';
import CreateAlert from './components/CreateAlert/CreateAlertContainer.jsx';
import HowToUseApp from './components/HowToUseApp/HowToUseAppContainer.jsx';
import NavBar from './components/Shared/NavBar.jsx';
import DeleteUser from './components/DeleteUser/DeleteUserContainer.jsx';
import EmployeeAuthentication from './components/EmployeeAuthentication/EmployeeAuthenticationContainer.jsx';
import UserManagement from './components/UserManagement/UserManagementContainer.jsx';
import RefillPunchCards from './components/RefillPunchCards/RefillPunchCardsContainer.jsx'
import ViewUserInfo from './components/ViewUserInfo/ViewUserInfoContainer.jsx'
import ManageAlert from './components/ManageAlert/ManageAlertContainer.jsx'
import EmployeeClockIn from  './components/EmployeeClockIn/EmployeeClockInContainer.jsx'
import EmployeeClockOut from  './components/EmployeeClockOut/EmployeeClockOutContainer.jsx'

class App extends Component {
  render() {
    return (
      <div id="Main-Container">
        <NavBar currState={this.state}/>
        <Switch>
          <Route exact path='/' component={MainMenu}/>
          <Route exact path='/Home' component={MainMenu}/>
          <Route path='/GymInformation' component={GymInformation}/>
          <Route path='/CheckIn' component={ClientCheckIn}/>
          <Route path='/Login' component={ClientLoginContainer}/>
          <Route path='/ClientAccount' component={ClientAccount}/>
          <Route path='/NewClientFormRedirect' component={NewClientFormRedirect}/>
	        <Route path='/ClientRegistration' component={ClientRegistration}/>
          <Route path='/MedicalQuestionnaire' component={MedicalQuestionnaire}/>
          <Route path='/EmployeeAuthentication' component={EmployeeAuthentication}/>
          <Route path='/EmployeePage' component={EmployeePage}/>
          <Route path='/AlertManagement' component={AlertManagement}/>
          <Route path='/UserManagement' component={UserManagement}/>
          <Route path='/DeleteUser' component={DeleteUser}/>
          <Route path='/CreateAlert' component={CreateAlert}/>
          <Route path='/MedicalQuestionnaire' component={MedicalQuestionnaire}/>
          <Route path='/HowToUseApp' component={HowToUseApp}/>
          <Route path='/RefillPunchCards' component={RefillPunchCards}/>
          <Route path='/ViewUserInfo' component={ViewUserInfo}/>
          <Route path='/ManageAlert' component={ManageAlert}/>
          <Route path='/EmployeeClockIn' component={EmployeeClockIn}/>
          <Route path='/EmployeeClockOut' component={EmployeeClockOut}/>
        </Switch>
      </div>
    );
  }
}

export default App;
