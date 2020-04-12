import React from 'react';

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = { feedback: '', name: 'oogo', email: 'oogobot@gmail.com' };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.sendEmail = this.sendEmail.bind(this);
  }


  async sendEmail (bookingId, bookingInfo, date, time, category) {

    console.log("ARRIVED AT SEND EMAIL")

    const {
      REACT_APP_EMAILJS_RECEIVER: receiverEmail,
      REACT_APP_EMAILJS_SENDER: senderEmail,
      REACT_APP_EMAILJS_TEMPLATEID: templateId,
      REACT_APP_EMAILJS_USERID: userId,
      REACT_APP_SERVICE_ID: serviceId
    } = this.props.env;

    let templateParams = {
      from_name: senderEmail,
      to_name: receiverEmail,
      bookingId: bookingId,
      time: time,
      date: date,
      category: category,
      filters: bookingInfo
    }

    window.emailjs.send(
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

  handleChange(event) {
    this.setState({feedback: event.target.value})
  }

  handleSubmit() {
  }
}
