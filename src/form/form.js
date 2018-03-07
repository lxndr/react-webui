import _ from 'lodash';
import {autobind} from 'core-decorators';
import React from 'react';
import PropTypes from 'prop-types';

export class Form extends React.Component {
  static propTypes = {
    value: PropTypes.any.isRequired,
    onChange: PropTypes.func.isRequired,
    readOnly: PropTypes.bool,
    children: PropTypes.node
  }

  static defaultProps = {
    readOnly: false
  }

  static childContextTypes = {
    form: PropTypes.object
  }

  _nextValue = null

  _delay = null

  getChildContext() {
    const {value, readOnly} = this.props;

    return {
      form: {value, readOnly, change: this.handleChange}
    };
  }

  componentWillUnmount() {
    if (this._delay) {
      clearImmediate(this._delay);
      this._delay = null;
    }
  }

  render() {
    return this.props.children;
  }

  @autobind
  handleChange(key, value) {
    if (!this._nextValue) {
      this._nextValue = _.cloneDeep(this.props.value);
    }

    _.set(this._nextValue, key, value);

    if (this._delay) {
      return;
    }

    /* Might not be the right way to do this */
    this._delay = setImmediate(() => {
      this.props.onChange(this._nextValue);
      this._delay = null;
      this._nextValue = null;
    });
  }
}
