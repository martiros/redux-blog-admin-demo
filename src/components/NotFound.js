import React from 'react';

export default function NotFound() {
  return (
    <div className="alert alert-danger" role="alert">
      <strong>Not Found!</strong> Requested resource not found or may be deleted!
    </div>
  );
}
