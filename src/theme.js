import React from 'react';
import PropTypes from 'prop-types';

export class Theme extends React.Component {
  static propTypes = {
    name: PropTypes.string.isRequired
  }

  componentDidMount() {
    document.body.classList.add(this.props.name);
  }

  componentWillUpdate(props) {
    document.body.classList.replace(this.props.name, props.name);
  }

  componentWillUnmount() {
    document.body.classList.remove(this.props.name);
  }

  render() {
    return null;
  }
}
