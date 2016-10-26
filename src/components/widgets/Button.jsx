import React, { PropTypes } from 'react';
import classnames from 'classnames';
import { Link } from 'react-router';
import Icon from './Icon';

const btnTypes = [
  'primary',
  'info',
  'default',
];

function Button({ children, type, className, icon, to, ...otherProps }) {
  const btnClassName = classnames('btn', `btn-${type}`, className);

  if (to) {
    return (
      <Link className={btnClassName} to={to} {...otherProps}>
        {icon && (
          <Icon icon={icon} />
        )}
        {' '}{children}
      </Link>
    );
  }

  return (
    <button type="button" className={btnClassName} {...otherProps}>
      {icon && (
        <Icon icon={icon} />
      )}
      {' '}{children}
    </button>
  );
}

Button.defaultProps = {
  type: 'default',
};

Button.propTypes = {
  type: PropTypes.oneOf(btnTypes),
  icon: PropTypes.string.isRequired,
  className: PropTypes.string,
  children: PropTypes.node,
  to: PropTypes.string,
};

export default Button;
