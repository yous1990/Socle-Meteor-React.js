import React from 'react';
import { Link } from 'react-router';

const Home = () => (
  <div className="lockscreen-wrapper">
    <div className="lockscreen-logo">
      <a href="../../index2.html"><b>Socle</b>Meteor</a>
    </div>

    <div className="lockscreen-name text-center"><b>SiFAST Socle - Meteor</b></div>

    <div className="text-center">
      <Link to={'/sign-in'}>Sign in </Link>or
      <Link to={'/sign-up'}> Register</Link>
    </div>

  </div>
);

export default Home;
