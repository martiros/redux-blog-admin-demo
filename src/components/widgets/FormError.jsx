import React from 'react';

export default function FormError({ field }) {
  if (!field.touched || !field.error) {
    return null;
  }

  return (
    <div><span className="help-block with-errors">{field.error}</span></div>
  );
}

FormError.propTypes = {
  field: React.PropTypes.shape({
    touched: React.PropTypes.boolean,
    error: React.PropTypes.string,
  }),
};
