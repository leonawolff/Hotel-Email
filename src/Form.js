import React from 'react';

export default class extends React.Component {
  constructor(props) {
	super(props);
	this.state = { feedback: '', name: 'oogo', email: 'oogobot@gmail.com' };
	this.handleChange = this.handleChange.bind(this);
	this.handleSubmit = this.handleSubmit.bind(this);
  }


mailTime (templateId, senderEmail, receiverEmail, bookingId, user) {
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
