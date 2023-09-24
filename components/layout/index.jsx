import React from 'react';
import Header from '../header';

const Layout = ({ children }) => {

  return (
    <div>
      <Header />
      <div className="container mt-3">
        {children}
      </div>
    </div>
  );
};

export default Layout;
