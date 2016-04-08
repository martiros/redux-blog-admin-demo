import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

function App({ children }) {
  return (
    <div id="app-box">
      <div className="main-container">
        {children}
      </div>
    </div>
  );
}

App.propTypes = {
  children: PropTypes.element,
};

export default connect()(App);
