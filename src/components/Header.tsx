import React from 'react';
import './Header.scss';

const Header = () => {
  return (
    <header className="header">
      <h1 className="heading">
        <span className="main"> Music </span>
        <span className="sub"> you are what you listen to </span>
      </h1>

      <div className="user-img"></div>
    </header>
  );
};

export { Header };
