import {useEffect, useContext} from "react";
import * as msTeams from '@microsoft/teams-js';
import { Router } from "react-router-dom";
import { Route, Switch } from 'react-router';
import { createBrowserHistory } from "history";
import { useAppContext, SET_THEME, SET_TEAMS_APP } from "./providers/AppProvider";
import { Provider, teamsTheme, teamsDarkTheme, teamsHighContrastTheme, teamsV2Theme, teamsDarkV2Theme } from '@fluentui/react-northstar';
import LayoutRoute from "./components/layouts/LayoutRoute";
import DashboardLayout from "./components/layouts/DashboardLayout";
import SimpleLayout from "./components/layouts/SimpleLayout";

import Configuration from "./components/pages/Configuration";
import NotFound from "./components/pages/NotFound";
import Login from "./components/authentication/Login";
import LoginCallback from "./components/authentication/LoginCallback";
import Classes from "./components/pages/Classes";
import Members from "./components/pages/Classes";
import Assignments from "./components/pages/Assignments/";

import './App.css';

const history = createBrowserHistory();

const switchTheme = (theme) => {
  switch (theme)
  {
    case "dark": return teamsHighContrastTheme;
    case "contrast": return teamsDarkTheme;
    default: return teamsTheme;
  }
}

function App() {
  const [state, dispatch] = useAppContext();
  useEffect(()=>{
    msTeams.initialize();
    msTeams.registerOnThemeChangeHandler((theme)=>{ dispatch({type: SET_THEME, payload: switchTheme(theme)}); });
    msTeams.getContext(context => {
      dispatch({type: SET_THEME, payload: switchTheme(context.theme)});
      dispatch({type: SET_TEAMS_APP, payload: msTeams});
      /*
      msTeams.authentication.authenticate({
        url: window.location.origin + "/login-teams",
        width: 600,
        height: 535,
        successCallback: result => {
          console.log(result);
        },
        failureCallback: error => {
          console.error(error);
        }
    });*/    
    });
  },[dispatch]);
  return (
    <Provider theme={state.theme}>
      <Router history={history}>
        <Switch>  
          <Route path="/login-callback" component={LoginCallback} />      
          <LayoutRoute path="/configure" component={Configuration} layout={SimpleLayout} />
          <LayoutRoute path="/classes" component={Classes} layout={DashboardLayout} />
          <LayoutRoute path="/members" component={Members} layout={DashboardLayout} />
          <LayoutRoute path="/login" component={Login} layout={DashboardLayout} />
          <LayoutRoute path="/assignments" component={Assignments} layout={DashboardLayout} />
          <LayoutRoute exact path="/" component={Login} layout={DashboardLayout} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
