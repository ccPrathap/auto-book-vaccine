import React from 'react';
// import {
//   BrowserRouter as Router,
//   Switch,
//   Route,
//   Link
// } from "react-router-dom";
// import CustomForm from './CustomForm';
import VaccineForm from './VaccineForm.Container';
// import CustomFormHook from './CustomFormHook';
// import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App App-header">
      <VaccineForm empId={123456} empName={"Test"} />
      {/* <Router>
        <ul>
          <li>
            <Link to="/">VaccineForm</Link>
          </li>
          <li>
            <Link to="/hook">CustomFormHook</Link>
          </li>
          <li>
            <Link to="/custom-form">CustomForm</Link>
          </li>
        </ul>

        <hr />

        <Switch>
          <Route exact path="/" render={() => <VaccineForm empId={123456} empName={"Test"}/>} />
          <Route path="/hook">
            <CustomFormHook />
          </Route>
          <Route path="/custom-form">
            <CustomForm />
          </Route>
        </Switch>
      </Router> */}
    </div>
  );
}

export default App;
