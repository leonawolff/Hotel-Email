import React, { Component } from "react";
import DatePicker from "react-datepicker";
import PropTypes from 'prop-types';
import "./App.css";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';
import 'bootstrap/dist/css/bootstrap.min.css';
import { env } from './config';

class App extends Component {
  constructor() {
    super();
    this.state = {
      startDate: new Date(),
      startTime: new Date(),
      filters: [],
      pub_filters: "",
      pub_category: "No category",
      bookingId: "",
      bookingInfo: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.sendEmail = this.sendEmail.bind(this);
  }

  async handleClick(e){

    // console.log("ID " + this.state.bookingId);
    // console.log("Info " + this.state.bookingInfo);
    // console.log("date " + this.state.date);
    // console.log("time " + this.state.time);
    // console.log("category " + this.state.category);

    this.sendEmail(e, this.state.bookingId, this.state.bookingInfo, this.state.date, this.state.time, this.state.category);

  }

  async handleChange(event) {
    const { name, value, type} = event.target;
    console.log(name);
    if (type === "checkbox") {
      if (this.state.filters.includes(value)) {
        this.state.filters = this.state.filters.filter(f => f !== value);
      } else {
        this.state.filters.push(value);
      }

      this.setState(
        {
          pub_filters: this.state.filters.join(", ")
        },
        () => this.updateBookingInfo()
      );
    }
    if (type === "select-one") {
      this.setState(
        {
          pub_category: event.target.value
        },
        () => this.updateBookingInfo()
      );
    }
    if (type === "text") {
      if (name === "bookingId"){
        this.setState(
          {
            bookingId : event.target.value
          }
        );
      }
      if (name === "date"){
        this.setState(
          {
            date : event.target.value
          }
        );
      }
      if (name === "time"){
        this.setState(
          {
            time : event.target.value
          }
        );
      }
      console.log("Booking ID : " + this.state.bookingId);
      console.log("Date : " + this.state.date);
      console.log("Time : " + this.state.time);
    };
  }

  updateBookingInfo() {
    if (this.state.pub_category.length !== 0)
    this.bookingInfo += `${this.state.pub_category}`;
    this.bookingInfo = this.state.filters.toString();
    this.bookingInfo = this.bookingInfo.replace(/,/g, '\n');
    // console.log("Booking Info: " + this.bookingInfo);
    this.setState({
      bookingInfo: this.bookingInfo
    });
    console.log("CATEGORY: " + this.state.pub_category);
  }

  sendEmail = (e, bookingId, bookingInfo, date, time, category) => {
    e.preventDefault();
    // require('dotenv').config();
    console.log("ARRIVED AT SEND EMAIL")
    //
    // const db = require('db')
    // db.connect({
    // host: process.env.DB_HOST,
    // username: process.env.DB_USER,
    // password: process.env.DB_PASS
    // })

    // const {
    //   REACT_APP_EMAILJS_RECEIVER: receiverEmail,
    //   REACT_APP_EMAILJS_SENDER: senderEmail,
    //   REACT_APP_EMAILJS_TEMPLATEID: templateId,
    //   REACT_APP_EMAILJS_USERID: userId,
    //   REACT_APP_SERVICE_ID: serviceId
    // } = this.props.env;

    var receiverEmail = "leona.wolff.ok@gmail.com";
    var senderEmail = "oogobot@gmail.com";
    var templateId = "oogo";
    var userId = "user_ewFjCDg6at4eSHF2rAY0O";
    var serviceId = "gmail";

    let templateParams = {
      from_name: senderEmail,
      to_name: receiverEmail,
      bookingId: bookingId,
      time: time,
      date: date,
      category: category,
      filters: bookingInfo
    }

    window.emailjs.sendForm(
      serviceId,
      templateId,
      {
        senderEmail,
        receiverEmail,
        templateParams
      },
      userId
    )
    .then(res => {
      this.setState({ formEmailSent: true })
    })
    .catch(err => console.error('Failed to send feedback. Error: ', err))
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
            value="new_borns"
            onChange={this.handleChange}
            />{" "}
            New borns
          </label>

          <br />
          <label>
            <input
            type="checkbox"
            name="pub_filters"
            value="non_smoker"
            onChange={this.handleChange}
            />{" "}
            Non smoker
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
          name="pub_category"
          >
            <option value="">none</option>
            <option value="babysitter"> babysitter</option>
            <option value="babysitter_overnight">babysitter_overnight</option>
            <option value="nanny">nanny</option>
            <option value="childminder">childminder</option>
            <option value="day_care">day_care</option>
            <option value="maternity_nurse">maternity_nurse</option>
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
          type="text"
          name="date"
          value={this.state.value}
          onChange={this.handleChange}
          />

          <br />
          <br />

          <label>
          Please select desired time for minder ********
          </label>
          <br />
          <input
          type="text"
          name="time"
          value={this.state.value}
          onChange={this.handleChange}
          />

          <button
            className = "submit"
            target="_blank"
            rel="noopener noreferrer"
            onClick = {this.handleClick}
            >
            Submit
          </button>
        </form>
      </div>

    );
  }
}

App.propTypes = {
env: PropTypes.object.isRequired
};

export default App;
