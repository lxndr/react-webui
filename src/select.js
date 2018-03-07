import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import {autobind} from 'core-decorators';

const valueType = PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.number
]);

export class Select extends React.Component {
  static propTypes = {
    items: PropTypes.array.isRequired,
    value: valueType,
    onChange: PropTypes.func,
    readOnly: PropTypes.bool,
    valueAttr: PropTypes.string,
    labelAttr: PropTypes.string,
    nullable: PropTypes.bool,
    nullValue: valueType,
    nullLabel: PropTypes.string
  }

  static defaultProps = {
    onChange: _.noop,
    readOnly: false,
    valueAttr: 'value',
    labelAttr: 'label',
    nullable: false,
    nullValue: null,
    nullLabel: '<none>'
  }

  render() {
    const {
      items, value, onChange, readOnly, valueAttr, labelAttr,
      nullable, nullValue, nullLabel, ...rest
    } = this.props;

    const _value = value === nullValue ? '' : value;

    return (
      <select value={_value} onChange={this.handleChange} disabled={readOnly} {...rest}>
        {nullable && <option key="" value="">{nullLabel}</option>}
        {this._renderList(items)}
      </select>
    );
  }

  _renderList(items, level = 0) {
    const {valueAttr, labelAttr} = this.props;
    const padding = _.repeat('\u00a0', level * 2);

    return items.map(item => {
      const value = item[valueAttr];
      const label = padding + item[labelAttr];

      if (item.items && item.items.length > 0) {
        return [
          <option key={`${level}-${value}`} disabled>{label}</option>,
          this._renderList(item.items, level + 1)
        ];
      }

      return <option key={value} value={value}>{label}</option>;
    });
  }

  @autobind
  handleChange(event) {
    const {onChange, nullable, nullValue} = this.props;
    let {value} = event.target;

    if (nullable && !value) {
      value = nullValue;
    }

    onChange(value);
  }
}
