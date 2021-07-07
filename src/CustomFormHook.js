import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from "react-router-dom";
import { OrgContext } from './GlobalContext';

const CustomForm = (props) => {
  const history = useHistory();
  const context = useContext(OrgContext);
  const [empId] = useState(props.empId);
  const [empName] = useState(props.empName);

  // const handleClick = () => history.push("/");

  useEffect(() => {
    console.log("DID Mount UseEffect");
    return () => {
      console.log("DID UnMount UseEffect");
    };
  }, []);

  useEffect(() => {
    setTimeout(() => history.push("/"), 4000);
    console.log("DID Update UseEffect");
  });

  // useEffect(() => () => {
  //   console.log("DID Unmount UseEffect");
  // }, []);



  console.log("2. This is render in HOOK");

  return isNaN(empId) ? (
    <div>
      {/* <button onClick={handleClick}>Goto Home page</button> */}
      <div />
      EMP Details:{empName && <p>{empId}. {empName}</p>}
      {/* {window.sessionStorage.getItem("formData")} */}
      {context.subOrg}
    </div>
  ) : <div>Loading...</div>;
}

export default CustomForm;