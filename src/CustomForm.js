import React from 'react';

export default class CustomForm extends React.Component {
  UNSAFE_componentWillMount() {
    console.log("1. This is componentWillMount");
  }

  componentDidMount() {
    /* let count = 0;
    while(count < 10e8) {
      count++;
    } */
    console.log("3. Tis is componentDidMount");
  }

  shouldComponentUpdate() {
    console.log("5. This is shouldComponentUpdate");
    return true;
  }

  UNSAFE_componentWillUpdate() {
    /* let count = 0;
    while(count < 10e9) {
      count++;
    } */
    console.log("6. This is componentWillUpdate");
  }

  // only run when updated props from parent are changed
  UNSAFE_componentWillReceiveProps(newProps) {
    console.log("4. This is componentWillReceiveProps", {
      current: this.props,
      future: newProps
    });
  }

  componentDidUpdate() {
    console.log("8. This is componentDidUpdate");
  }

  componentWillUnmount() {
    console.log("9. This is componentWillUnmount");
  }

  render() {
    console.log("2. This is render CLASS");
    const { empId, empName } = this.props;

    return isNaN(empId) ? (
      <div>
        EMP Details:{empName && <p>{empId}. {empName}</p>}
      </div>
    ) : <div>Loading...</div>;
  }
}
