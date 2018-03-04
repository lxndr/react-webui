import React from 'react';
import PropTypes from 'prop-types';
import {Modal} from 'react-overlays';
import cn from 'classnames';

export class Dialog extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    title: PropTypes.node,
    children: PropTypes.node,
    show: PropTypes.bool
  }

  static defaultProps = {
    show: true
  }

  render() {
    const {className, title, show, children} = this.props;

    return (
      <Modal show={show} backdropClassName="overlay-backdrop">
        <div className={cn('overlay-dialog', className)}>
          {title && <div className="dialog-header">{title}</div>}
          <div className="dialog-body">{children}</div>
        </div>
      </Modal>
    );
  }
}
