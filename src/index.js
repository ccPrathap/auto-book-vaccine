import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { OrgContext } from './GlobalContext';

const MyBaseComp = () => {
  const [subOrg, setSubOrg] = useState("Tech support");

  return <OrgContext.Provider
    value={{ org: "MyOrgFromContext", subOrg, setSubOrg }}
  >
    <App empId={Math.floor(Math.random() * 10e6)} empName={"Employee Name"} />
  </OrgContext.Provider>;
};

ReactDOM.render(
  <MyBaseComp />,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
