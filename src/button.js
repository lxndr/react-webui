import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

export class Button extends React.PureComponent {
  static propTypes = {
    type: PropTypes.string,
    label: PropTypes.string,
    iconClass: PropTypes.string,
    children: PropTypes.node
  }

  static defaultProps = {
    type: 'button'
  }

  render() {
    const {iconClass, label, children, ...props} = this.props;

    return (
      <button {...props}>
        {iconClass && <i className={cn('icon', iconClass)}/>}
        {label && <span className="label">{label}</span>}
        {children}
      </button>
    );
  }
}
