import React from 'react';
import { DateTime } from "luxon";
import { OrgContext } from './GlobalContext';

export default class VaccineForm extends React.Component {
  static contextType = OrgContext;

  state = {
    pincode: "",
    date: "",
    slots: [],
    submitting: false,
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
    const { date, pincode } = this.state;
    this.setState({ submitting: true });
    // window.sessionStorage.setItem("formData", JSON.stringify(this.state));
    const data = await fetch(`/api/v2/appointment/sessions/public/findByPin?pincode=${pincode}&date=${DateTime.fromSQL(date).toFormat("dd-MM-yyyy")}`, {
      'headers': {
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36 Edg/90.0.818.62',
        'accept': 'application/json, text/plain, */*',
        'content-type': 'application/json',
      },
    });
    const res = await data.json();
    const slots = [];
    const { sessions = [] } = res;
    sessions.forEach(item => {
      const {
        available_capacity_dose1,
        available_capacity_dose2,
        center_id,
        min_age_limit,
        name,
        vaccine
      } = item;
      if (available_capacity_dose1 && min_age_limit === 18) {
        slots.push({
          name,
          vaccine,
          center_id,
          available_capacity_dose1,
          available_capacity_dose2,
          min_age_limit
        });
      }
    });
    // this.context.setSubOrg(this.state.pincode);
    this.setState({
      slots,
      submitting: false,
      submittedOnce: true,
      slotAvailability: slots.length > 0
    });
  }

  render() {
    const {
      slots,
      submitting,
      submittedOnce,
      slotAvailability,
      date,
      pincode
    } = this.state;

    return (
      <>
        <h1>Search vaccine availablity for 18+</h1>
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
          min={DateTime.now().toISODate()}
          onChange={this.handleChange}
        />
        <div style={{ margin: "10px" }} />
        <button
          disabled={!(pincode && date) || submitting}
          onClick={this.handleSubmit}>{submitting ? "Submitting..." : "Submit"}
        </button>
        <div style={{ margin: "10px" }} />
        {slotAvailability && <>
          <h2>Hey! I found the available slot(s)...!</h2>
          <ol style={{ textAlign: "left" }}>
            {slots.map(slot => <li key={slot.center_id}>
              {slot.vaccine} - Available slots at <b>{slot.name}</b> for <b>dose 1</b> are <b>{slot.available_capacity_dose1}</b>
            </li>)}
          </ol>
        </>}
        {submittedOnce && !slotAvailability && <h2>No available slots found...! :(</h2>}
      </>
    );
  }
}