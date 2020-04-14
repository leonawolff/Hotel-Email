import React, { Component } from "react";
//import PropTypes from 'prop-types';
import emailjs from 'emailjs-com';
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      filters: [],
      pub_filters: "",
      pub_category: "No category",
      bookingId: "",
      bookingInfo: "",
      valid: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.sendEmail = this.sendEmail.bind(this);
    this.validate = this.validate.bind(this);
  }

  validate() {
    const errors = [];

    if (this.state.bookingId === undefined) {
      errors.push("Booking ID can't be empty");
    }
    if (this.state.startTime === undefined) {
      errors.push("Start time can't be empty");
    }
    if (this.state.endTime === undefined) {
      errors.push("End time can't be empty");
    }
    if (this.state.date === undefined) {
      errors.push("Date can't be empty");
    }
    return errors;
  }

  async handleClick(e){
    this.sendEmail(e);
  }

  async handleChange(event) {
    const { name, value, type} = event.target;

    if(this.validate().length === 0){
      this.state.valid = true;
    }
    if(this.validate().length > 0 ){
      this.state.valid = false;
    }

    if (type === "checkbox") {
      if (this.state.filters.includes(value)) {
        this.state.filters = this.state.filters.filter(f => f !== value);
      } else {
        this.state.filters.push(value);
      }

      this.setState({pub_filters: this.state.filters.join(", ")},
        () => this.updateBookingInfo()
      );
    }
    if (type === "select-one") {
      this.setState({pub_category: event.target.value},
        () => this.updateBookingInfo()
      );
    }
    if (type === "date"){
      this.setState({date : event.target.value});
    }
    if (type === "time"){
      if (name === "startTime"){
        this.setState({startTime : event.target.value});
      }
      if (name === "endTime"){
        this.setState({endTime : event.target.value});
      }
    }
    if (type === "text") {
      if (name === "bookingId"){
        this.setState({bookingId : event.target.value});
      }
    };
  }

  updateBookingInfo() {
    if (this.state.pub_category.length !== 0)
    this.bookingInfo += `${this.state.pub_category}`;
    this.bookingInfo = this.state.filters.toString();
    this.bookingInfo = this.bookingInfo.replace(/,/g, '<br/>');
    this.bookingInfo = this.bookingInfo.replace(/_/g, ' ');
    this.setState({
      bookingInfo: this.bookingInfo
    });
  }

  async sendEmail(e){
    e.preventDefault();

    let templateParams = {
      from_name: process.env.REACT_APP_EMAILJS_SENDER,
      to_name: process.env.REACT_APP_EMAILJS_RECEIVER,
      bookingId: this.state.bookingId,
      startTime: this.state.startTime,
      endTime: this.state.endTime,
      date: this.state.date,
      category: this.state.pub_category.replace(/_/g, ' '),
      filters: this.state.bookingInfo
    }

    emailjs.send(process.env.REACT_APP_SERVICE_ID,process.env.REACT_APP_TEMPLATE_ID,templateParams,process.env.REACT_APP_USER_ID)
    .then((result) => {
      console.log(result.text);
    }, (error) => {
      console.log(error.text);
    });
  }

  render() {
    return (
      <div>
      <form>
      <h1>
      <img className = "logo"  alt = "logo" src={"logo192.png"}  width = "50" height = "50"/>
      <text className = "title">Book a Minder</text>
      </h1>
      <h2 className = "press">
      </h2>
      <h2>Filters</h2>
      <label>
      <input
      type="checkbox"
      name="pub_filters"
      value="newborns"
      onChange={this.handleChange}
      />{" "}
      Newborns
      </label>
      <br />
      <label>
      <input
      type="checkbox"
      name="pub_filters"
      value="non_smoker"
      onChange={this.handleChange}
      />{" "}
      Non-smoker
      </label>
      <br />
      <label>
      <input
      type="checkbox"
      name="pub_filters"
      value="first_aid"
      onChange={this.handleChange}
      />{" "}
      First aid
      </label>
      <br />
      <label>
      <input
      type="checkbox"
      name="pub_filters"
      value="own_transport"
      onChange={this.handleChange}
      />{" "}
      Own Transport
      </label>
      <br />
      <label>
      <input
      type="checkbox"
      name="pub_filters"
      value="qualifications"
      onChange={this.handleChange}
      />{" "}
      Qualifications
      </label>
      <br />
      <label>
      <input
      type="checkbox"
      name="pub_filters"
      value="overnights"
      onChange={this.handleChange}
      />{" "}
      Overnights
      </label>
      <br />
      <label>
      <input
      type="checkbox"
      name="pub_filters"
      value="evenings"
      onChange={this.handleChange}
      />{" "}
      Evenings
      </label>
      <br />
      <label>
      <input
      type="checkbox"
      name="pub_filters"
      value="mornings"
      onChange={this.handleChange}
      />{" "}
      Mornings
      </label>
      <br />
      <label>
      <input
      type="checkbox"
      name="pub_filters"
      value="all_day"
      onChange={this.handleChange}
      />{" "}
      All day
      </label>
      <br />
      <br />
      <label>Category: </label>
      <br />
      <select
      value={this.state.pub_category}
      defaultValue={{ label: "Select Dept", value: 0 }}
      onChange={this.handleChange}
      name="pub_category">
      <option value="">none</option>
      <option value="babysitter"> babysitter</option>
      <option value="overnight babysitter">overnight babysitter</option>
      <option value="nanny">nanny</option>
      <option value="childminder">childminder</option>
      <option value="day care">day care</option>
      <option value="maternity nurse">maternity nurse</option>
      </select>
      <br />
      <br />
      <label>
      Please enter your booking number:
      </label>
      <br />
      <input
      type="text"
      name="bookingId"
      value={this.state.value}
      onChange={this.handleChange}
      />
      <br />
      <br />
      <label>
      Please select desired date for minder:
      </label>
      <br />
      <input
      type="date"
      name="date"
      value={this.state.value}
      onChange={this.handleChange}
      />
      <br />
      <br />
      <label>
      Please enter minder start time:
      </label>
      <br />
      <input
      type="time"
      name="startTime"
      value={this.state.value}
      onChange={this.handleChange}
      />
      <br />
      <br />
      <label>
      Please enter minder end time:
      </label>
      <br />
      <input
      type="time"
      name="endTime"
      value={this.state.value}
      onChange={this.handleChange}
      />
      <button
      disabled={!(this.state.valid)}
      title="Login"
      className = "submit"
      target="_blank"
      rel="noopener noreferrer"
      onClick = {this.handleClick}
      >
      Submit
      </button>
      </form>
      <script type="text/javascript"
      src="https://cdn.jsdelivr.net/npm/emailjs-com@2.4.1/dist/email.min.js">
      </script>
      <script type="text/javascript">
      (function(){
        emailjs.init(process.env.REACT_APP_USER_ID)
      })();
      </script>
      </div>
    );
  }
}

export default App;
