import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class DefaultFooter extends Component {
  render() {
    const { children, ...attributes } = this.props;

    return (
      <Fragment>
        <span className="ml-auto"><a href="/">SQUADRON PLAY</a> &copy; 2020.</span>
      </Fragment>
    );
  }
}

DefaultFooter.propTypes = propTypes;
DefaultFooter.defaultProps = defaultProps;

export default DefaultFooter;
