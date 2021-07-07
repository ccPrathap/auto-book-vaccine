import React from 'react';
import { OrgContext } from './GlobalContext';

export default class VaccineForm extends React.Component {
  static contextType = OrgContext;

  state = {
    pincode: "",
    date: "",
    slotAvailability: false,
    bookInput: {}
  };

  handleChange = e => {
    const { name, value } = e.target;
    if (name === "pincode") {
      value.length <= 6 && this.setState({ pincode: value });
    } else {
      this.setState({ [name]: value });
    }
  };

  handleSubmit = async () => {
    const { pincode } = this.state;
    // window.sessionStorage.setItem("formData", JSON.stringify(this.state));
    const data = await fetch(`/api/v2/appointment/sessions/public/calendarByPin?pincode=${pincode}&date=04-07-2021`);
    const res = await data.json();
    console.log("data ==> ", res);
    this.context.setSubOrg(this.state.pincode);
  }

  render() {
    const { org = "", subOrg = "" } = this.context;
    const { slotAvailability, date, pincode } = this.state;

    return (
      <>
        <h1>This is for {org}-{subOrg} only</h1>
        <input
          placeholder="Enter pincode"
          type="number"
          name="pincode"
          value={pincode}
          onChange={this.handleChange}
        />
        <div style={{ margin: "10px" }} />
        <input
          placeholder="Enter pincode"
          type="date"
          name="date"
          value={date}
          onChange={this.handleChange}
        />
        <div style={{ margin: "10px" }} />
        <button disabled={!(pincode && date)} onClick={this.handleSubmit}>Submit</button>
        <div style={{ margin: "10px" }} />
        {slotAvailability && <h2>Hey! I found the available slot...!</h2>}
      </>
    );
  }
}