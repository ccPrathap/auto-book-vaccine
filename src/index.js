import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import { store } from './Store';
import reportWebVitals from './reportWebVitals';

const MyBaseComp = () => {
  return <React.StrictMode>
    <Provider store={store}>
      <App empId={Math.floor(Math.random() * 10e6)} empName={"Employee Name"} />
    </Provider>
  </React.StrictMode>;
};

ReactDOM.render(
  <MyBaseComp />,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
