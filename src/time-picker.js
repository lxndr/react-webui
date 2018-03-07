import React from 'react';
import PropTypes from 'prop-types';

export class TimePicker extends React.Component {
  static propTypes = {
    value: PropTypes.any,
    readOnly: PropTypes.bool,
    disabled: PropTypes.bool
  }

  static defaultProps = {
    value: null,
    readOnly: false,
    disabled: false
  }

  render() {
    const {value, readOnly, disabled} = this.props;

    if (readOnly || disabled) {
      const date = value ? new Date(value).toLocaleString() : '';
      return <input type="text" readOnly value={date}/>;
    }

    return null;
  }
}
