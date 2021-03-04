import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { AppProvider } from "./providers/AppProvider";
import { MsalProvider } from "@azure/msal-react";
import { PublicClientApplication } from "@azure/msal-browser";
import App from './App';
import reportWebVitals from './reportWebVitals';
import {config} from "./configuration/authentication";

const msalConfig = {
  auth: config
};

const pca = new PublicClientApplication(msalConfig);

ReactDOM.render(
  <React.StrictMode>
    <AppProvider>
      <MsalProvider instance={pca}>
        <App />
      </MsalProvider>
    </AppProvider>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
