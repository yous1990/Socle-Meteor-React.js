import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const SideBarMenu = ({ userCount }) => (
  <ul className="sidebar-menu">
    <li className="header">MAIN NAVIGATION</li>

    {/*<li className="active treeview">
      <a href="#">
        <i className="fa fa-dashboard" />
        <span>Dashboard</span> <i className="fa fa-angle-left pull-right" />
      </a>
      <ul className="treeview-menu">
        <li className="active">
          <Link to={'/dashboard'}><i className="fa fa-circle-o" /> Dashboard 1</Link></li>
        <li><a href="#"><i className="fa fa-circle-o" /> Dashboard 2</a></li>
      </ul>
    </li>*/}
    <li className="treeview">
      <a href="#" >
        <i className="fa fa-users" /> <span> Users </span>
        <i className="fa fa-angle-left pull-right" />
      </a>
       <ul className="treeview-menu">
        <li className="active">
          <Link to={'/dashboard/users/new'}><i className="fa fa-circle-o" /> New</Link></li>
        <li><Link to={'/dashboard/users'}><i className="fa fa-circle-o" /> View All
        <small className="label pull-right bg-blue" > {userCount} </small>
        </Link></li>
      </ul>
    </li>
  </ul>
);

SideBarMenu.propTypes = {
  userCount: PropTypes.number,
};

export default SideBarMenu;
