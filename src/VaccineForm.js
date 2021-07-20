import React from 'react';
import { DateTime } from "luxon";

class VaccineForm extends React.Component {
  state = {
    pincode: "",
    date: "",
    slots: [],
    submitting: false,
    slotAvailability: false,
    bookInput: {}
  };

  componentDidUpdate(prevProps) {
    if (this.props.data !== prevProps.data) {
      const slots = [];
      const { sessions = [] } = this.props.data;
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

      this.setState({
        slots,
        submitting: false,
        submittedOnce: true,
        slotAvailability: slots.length > 0
      });
    }
  }

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
    this.props.updateSubOrg(pincode);
    this.setState({ submitting: true });
    this.props.fetchSlots({ date, pincode });
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
    const { errorMsg, isLoading, org, subOrg } = this.props;
  
    return (
      <>
        <h1>Search vaccine availablity for 18+ ({org}-{subOrg})</h1>
        <input
          placeholder="Enter pincode"
          type="number"
          name="pincode"
          value={pincode}
          onChange={this.handleChange}
        />
        <div style={{ margin: "10px" }} />
        <input
          placeholder="dd-mm-yyyy"
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
        {!isLoading && slotAvailability && <>
          <h2>Hey! I found the available slot(s)...!</h2>
          <ol style={{ textAlign: "left" }}>
            {slots.map(slot => <li key={`${slot.center_id}_${slot.vaccine}`}>
              {slot.vaccine} - Available slots at <b>{slot.name}</b> for <b>dose 1</b> are <b>{slot.available_capacity_dose1}</b>
            </li>)}
          </ol>
        </>}
        {!isLoading && submittedOnce && !slotAvailability && <h2>No available slots found...! :(</h2>}
        {isLoading && <h2>Loading...</h2>}
        {errorMsg && <h2 style={{ color: "red" }}>{errorMsg}</h2>}
      </>
    );
  }
}

export default VaccineForm;