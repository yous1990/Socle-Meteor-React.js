import React from 'react';
var pckg = require('../../../../package.json');
const AppFooter = () => (
  <footer className="main-footer">
    <div className="pull-right hidden-xs">
      <b>Version :  </b> {pckg.version}
    </div>
    <strong>Copyright &copy; 2017 <a href="">SiFAST</a>.</strong> 
  </footer>
);

export default AppFooter;
