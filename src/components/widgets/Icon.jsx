import React, { PropTypes } from 'react';
import classnames from 'classnames';

function Icon({ icon }) {
  const className = classnames('glyphicon', `glyphicon-${icon}`);
  return (
    <i className={className} ></i>
  );
}

Icon.propTypes = {
  icon: PropTypes.string.isRequired,
};

export default Icon;
