import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import {autobind} from 'core-decorators';

export class Field extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    name: PropTypes.string.isRequired,
    readOnly: PropTypes.bool,
    label: PropTypes.string,
    nullify: PropTypes.bool,
    labelClass: PropTypes.string,
    type: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.func
    ])
  }

  static defaultProps = {
    readOnly: false,
    nullify: false,
    type: 'text'
  }

  static contextTypes = {
    form: PropTypes.object
  }

  render() {
    const {form} = this.context;
    const {className, type, readOnly, label, labelClass, name, nullify, ...rest} = this.props;

    const value = _.get(form.value, name);
    let Component = type;

    const props = {
      id: name,
      readOnly: readOnly || form.readOnly,
      onChange: this.handleChange
    };

    if (typeof type === 'string') {
      Component = 'input';
      props.type = type;
    }

    if (Component === 'input') {
      if (props.type === 'checkbox') {
        if (rest.value) {
          props.id += '_' + rest.value;
          props.checked = _.isArray(value) && _.includes(value, rest.value);
        } else {
          props.checked = value || false;
        }
      } else {
        props.value = value || '';
      }
    } else {
      props.value = value;
    }

    return (
      <div className={cn('form-field', `form-field_${name}`, className)}>
        {label &&
          <label htmlFor={props.id} className={labelClass}>{label}</label>
        }

        <Component {...props} {...rest}/>
      </div>
    );
  }

  @autobind
  handleChange(event) {
    const {form} = this.context;
    const {name, nullify, ...rest} = this.props;
    let value = event;

    if (event && typeof event === 'object' && event.target) {
      const target = event.target;

      if (target.type === 'checkbox') {
        if (rest.value) {
          const old = _.get(form.value, name);

          if (target.checked) {
            value = _.union(old, [rest.value]);
          } else {
            value = _.without(old, rest.value);
          }
        } else {
          value = target.checked;
        }
      } else {
        value = target.value;
      }
    }

    if (nullify && !value) {
      value = null;
    }

    form.change(name, value);
  }
}
