import React from 'react';

export default function HocForm(Com) {
  class FormComponent extends React.Component {
    constructor(props) {
      super(props);
      this.state = {}
      // this.handleChange = this.handleChange.bind(this)
    }
    handleChange = (key, value) => {
      this.setState({
        [key]: value
      })
    }
    render() {
      return (
        <Com handleChange={this.handleChange} state={this.state} {...this.props}></Com>
      )
    }
  }
  return FormComponent
}