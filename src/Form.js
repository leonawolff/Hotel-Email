import React from 'react';

export default class extends React.Component {
  constructor(props) {
	super(props);
	this.state = { feedback: '', name: 'oogo', email: 'oogobot@gmail.com' };
	this.handleChange = this.handleChange.bind(this);
	this.handleSubmit = this.handleSubmit.bind(this);
  }


mailTime (bookingId, bookingInfo, date, time) {

  const {
    REACT_APP_EMAILJS_RECEIVER: receiverEmail,
    REACT_APP_EMAILJS_SENDER: senderEmail,
    REACT_APP_EMAILJS_TEMPLATEID: templateId,
    REACT_APP_EMAILJS_USERID: user,
  } = this.props.env;

        window.emailjs.send(
          'default_service',
          templateId,
          {
            senderEmail,
            receiverEmail,
            bookingId
          },
          user
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
