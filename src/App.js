import React, { Component } from "react";
import PropTypes from 'prop-types';
//import moment from 'moment'
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

    console.log("ARRIVED AT VALIDATE")
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
    // if((this.state.date !== undefined)){
    //
    //   var tempDate = moment(this.state.date);
    //   var validDate = moment.isValid(tempDate);
    //
    //   if(validDate){
    //
    //     var dateArray = this.state.date.split("-");
    //     var inputDate = new Date(dateArray[0], (parseInt(dateArray[1])-1), dateArray[2]);
    //     var today = new Date();
    //     console.log("Booking date = " + inputDate);
    //     console.log("Booking date unix = " + inputDate.getTime());
    //     console.log("Current date unix = " + today.getTime());
    //
    //     // This needs to only be applied to a valid date.
    //     if(this.state.bookingDate.getTime() < today.getTime()){
    //       errors.push("Chosen date cannot be before today");
    //
    //     }
    //     else{
    //       errors.push("Invalid date");
    //     }
    //   }
    //
    // }
    return errors;
  }

  // checkValidDate(date) {
  //   var dateArray = this.state.date.split("-");
  //
  //   if(dateArray.length < 2){
  //     return false;
  //   }
  //   if(dateArray[0] < 0){
  //
  //   }
  //
  // }

  async handleClick(e){

    //    var errors = this.validate(this.state.bookingId, this.state.bookingDate, this.state.startTime, this.state.endTime);

    console.log("HANDLE CLICK");

    console.log("this.state.bookingId " + this.state.bookingId);
    console.log("this.state.bookingInfo " + this.state.bookingInfo);
    console.log("this.state.date " + this.state.date);
    console.log("this.state.startTime " + this.state.startTime);
    console.log("this.state.endTime " + this.state.endTime);
    console.log("this.state.pub_category " + this.state.pub_category);

    // var dateArray = this.state.date.split("-");
    // var inputDate = new Date(dateArray[0], (parseInt(dateArray[1])-1), dateArray[2]);
    // var today = new Date();
    // console.log("Booking date = " + inputDate);
    // console.log("Booking date unix = " + inputDate.getTime());
    // console.log("Current date unix = " + today.getTime());

    console.log("END OF HANDLE CLICK");

    this.sendEmail(e);

  }

  async handleChange(event) {
    const { name, value, type} = event.target;
    console.log(name);

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
    if (type === "date"){
      this.setState(
        {
          date : event.target.value
        }
      );
    }
    if (type === "time"){
      if (name === "startTime"){
        this.setState(
          {
            startTime : event.target.value
          }
        );
      }
      if (name === "endTime"){
        this.setState(
          {
            endTime : event.target.value
          }
        );
      }
    }
    if (type === "text") {
      if (name === "bookingId"){
        this.setState(
          {
            bookingId : event.target.value
          }
        );
      }
      console.log("Booking ID : " + this.state.bookingId);
      console.log("Date : " + this.state.date);
      console.log("Start time : " + this.state.startTime);
      console.log("End time : " + this.state.endTime);
    };
  }


  updateBookingInfo() {
    if (this.state.pub_category.length !== 0)
    this.bookingInfo += `${this.state.pub_category}`;
    this.bookingInfo = this.state.filters.toString();
    this.bookingInfo = this.bookingInfo.replace(/,/g, '<br/>');
    this.bookingInfo = this.bookingInfo.replace(/_/g, ' ');
    // console.log("Booking Info: " + this.bookingInfo);
    this.setState({
      bookingInfo: this.bookingInfo
    });
    //    this.category = this.bookingInfo.replace(/_/g, ' ');
    console.log("CATEGORY: " + this.state.pub_category.replace(/_/g, ' '));
  }

  async sendEmail(e){
    e.preventDefault();
    console.log(process.env.REACT_APP_SERVICE_ID);
    console.log(process.env.REACT_APP_TEMPLATE_ID);
    console.log(process.env.REACT_APP_USER_ID);
    console.log(process.env.REACT_APP_EMAILJS_RECEIVER);

    var receiverEmail = process.env.REACT_APP_EMAILJS_RECEIVER;
    var senderEmail = process.env.REACT_APP_EMAILJS_SENDER;
    var templateId = process.env.REACT_APP_TEMPLATE_ID;
    var userId = process.env.REACT_APP_USER_ID;
    var serviceId = process.env.REACT_APP_SERVICE_ID;
    var bookingId = this.state.bookingId;
    var startTime = this.state.startTime;
    var endTime = this.state.endTime;
    var date = this.state.date;
    var category = this.state.pub_category.replace(/_/g, ' ');
    var filters = this.state.bookingInfo;

    let templateParams = {
      from_name: senderEmail,
      to_name: receiverEmail,
      bookingId: bookingId,
      startTime: startTime,
      endTime: endTime,
      date: date,
      category: category,
      filters: filters
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

App.propTypes = {
  env: PropTypes.object.isRequired
};

export default App;
