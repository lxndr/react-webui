import React from 'react';
import PropTypes from 'prop-types';
import ReactDatePicker from 'react-datepicker';
import moment from 'moment';

export class DatePicker extends React.Component {
  static propTypes = {
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object
    ]),
    readOnly: PropTypes.bool,
    disabled: PropTypes.bool
  }

  static defaultProps = {
    value: null,
    readOnly: false,
    disabled: false
  }

  render() {
    const {value, readOnly, disabled, ...props} = this.props;

    if (readOnly || disabled) {
      const date = value ? new Date(value).toLocaleDateString() : '';

      return (
        <input type="text" readOnly value={date}/>
      );
    }

    const _value = value ? moment(value) : null;

    return (
      <ReactDatePicker
        selected={_value}
        {...props}
      />
    );
  }
}
