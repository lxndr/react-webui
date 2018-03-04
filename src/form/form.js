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

  getChildContext() {
    const {value, readOnly} = this.props;

    return {
      form: {value, readOnly, change: this.handleChange}
    };
  }

  render() {
    return this.props.children;
  }

  @autobind
  handleChange(key, value) {
    const model = _.cloneDeep(this.props.value);
    _.set(model, key, value);
    this.props.onChange(model);
  }
}
