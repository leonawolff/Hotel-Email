import React, { Component } from "react";
import "./App.css";
import Form from './Form';

class App extends Component {
  constructor() {
    super();
    this.state = {
      location: window.location.href.substr(23),
      filters: [],
      pub_filters: "",
      pub_category: "",
      queryString: "",
      url: window.location.href
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  async handleClick(e){

    const {
         REACT_APP_EMAILJS_RECEIVER: receiverEmail,
         REACT_APP_EMAILJS_TEMPLATEID: template,
         REACT_APP_EMAILJS_USERID: user,
         REACT_APP_EMAILJS_SENDER: senderEmail
       } = this.props.env

       Form.mailTime(
         template,
         senderEmail,
         receiverEmail,
         this.state.value,
         user
       );
     }
  async handleChange(event) {
    const { name, value, type} = event.target;
    if (type === "checkbox") {
      if (this.state.filters.includes(value)) {
        this.state.filters = this.state.filters.filter(f => f !== value);
      } else {
        this.state.filters.push(value);
      }
      this.setState(
        {
          pub_filters: this.state.filters.join("%2C")
        },
        () => this.updateQueryString()
      );
    }
    if (type === "text") {
      console.log(event.target.value);
    }else {
      this.setState({ [name]: value }, () => this.updateQueryString());
    }
  }

  updateQueryString() {
    let queryString = "";
    if (this.state.pub_category.length !== 0)
      queryString += `pub_category=${this.state.pub_category}&`;
    if (this.state.pub_filters.length !== 0)
      queryString += `pub_filters=${this.state.pub_filters}`;
    this.setState({
      queryString: queryString
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
            value={this.state.value}
            onChange={this.handleChange}
        />

        <br />
        <br />

        <button
          className = "submit"
          href={`https://oogo.herokuapp.com/s?${this.state.queryString}`}
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

export default App;
