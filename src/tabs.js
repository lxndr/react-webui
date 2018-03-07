import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import {autobind} from 'core-decorators';

export class Tab extends React.Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    hidden: PropTypes.bool,
    children: PropTypes.node
  }

  static defaultProps = {
    disabled: false,
    hidden: false
  }

  render() {
    const {hidden} = this.props;
    const style = hidden ? {display: 'none'} : {};

    return (
      <div className="tab" style={style}>
        {this.props.children}
      </div>
    );
  }
}

export class Tabs extends React.Component {
  static propTypes = {
    children: PropTypes.node,
    selected: PropTypes.string,
    onChange: PropTypes.func
  }

  static defaultProps = {
    onChange: _.noop,
    selected: null
  }

  state = {
    selected: null
  }

  render() {
    const tabs = React.Children.map(this.props.children, (tab, index) => {
      if (tab) {
        const id = tab.props.id || String(index);
        return React.cloneElement(tab, {id});
      }
    });

    let selected = this.props.selected || this.state.selected;

    if (selected === null && tabs.length > 0) {
      selected = tabs[0].props.id;
    }

    return (
      <div className="tabs">
        <ul className="tab-list">
          {React.Children.map(tabs, tab => {
            const {id, hidden, disabled, title} = tab.props;

            if (hidden) {
              return null;
            }

            return (
              <li
                id={id}
                key={id}
                className={cn({
                  selected: selected === id,
                  disabled
                })}
                onClick={this.handleClick}
              >
                {title}
              </li>
            );
          })}
        </ul>

        {React.Children.map(tabs, tab => {
          const {id} = tab.props;

          return React.cloneElement(tab, {
            key: id,
            hidden: selected !== id
          });
        })}
      </div>
    );
  }

  @autobind
  handleClick(event) {
    const {id} = event.target;
    this.setState({selected: id});
    this.props.onChange(id);
  }
}
