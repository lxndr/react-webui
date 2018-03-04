import React from 'react';
import PropTypes from 'prop-types';
import {autobind} from 'core-decorators';
import {Form} from './form';

export class SubmitForm extends React.Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired
  }

  render() {
    const {onSubmit, ...props} = this.props;

    return (
      <form onSubmit={this.handleSubmit}>
        <Form {...props}/>
      </form>
    );
  }

  @autobind
  handleSubmit(event) {
    event.preventDefault();
    this.props.onSubmit();
  }
}
