import React, { Component, Fragment } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Badge, UncontrolledDropdown, DropdownItem, DropdownMenu, DropdownToggle, Nav, NavItem } from 'reactstrap';
import PropTypes from 'prop-types';

import { AppAsideToggler, AppNavbarBrand, AppSidebarToggler } from '@coreui/react';
import logo from '../../../../assets/img/brand/logo.svg';
import sygnet from '../../../../assets/img/brand/sygnet.svg'

class DefaultHeader extends Component {
  render() {

    const { children, ...attributes } = this.props;

    return (
      <Fragment>
        <AppSidebarToggler className="d-lg-none" display="md" mobile />
        <a href="/">
        <AppNavbarBrand
          full={{ src: '/images/logo.png', width: 89, height: 25, alt: 'CM Portal' }}
          minimized={{ src: sygnet, width: 30, height: 30, alt: 'CM Portal' }}
        /> </a>
        {/* <AppSidebarToggler className="d-md-down-none" display="lg" /> 

        <Nav className="d-md-down-none" navbar>
          <NavItem className="px-3">
            <NavLink to="/dashboard" className="nav-link" >Dashboard</NavLink>
          </NavItem>
          <NavItem className="px-3">
            <Link to="/users" className="nav-link">Users</Link>
          </NavItem>
          <NavItem className="px-3">
            <NavLink to="#" className="nav-link">Settings</NavLink>
          </NavItem>
          <NavItem className="px-3">
            <NavLink to="/gitflow/1" className="nav-link">GitFlow</NavLink>
          </NavItem>
        </Nav>
        <Nav className="ml-auto" navbar>
          <UncontrolledDropdown nav direction="down">
            <DropdownToggle nav>
              <img src={'../../assets/img/avatars/1.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com" />
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem header tag="div" className="text-center"><strong><Link to="/users/0" className="nav-link">Account</Link></strong></DropdownItem>
              <DropdownItem onClick={e => this.props.onLogout(e)}><i className="fa fa-lock"></i> Logout</DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
        <AppAsideToggler className="d-md-down-none" />
        <AppAsideToggler className="d-lg-none" mobile />*/}
      </Fragment>
    );
  }
}

// DefaultHeader.propTypes = {
//   children: PropTypes.node,
// };
// DefaultHeader.defaultProps = defaultProps;

export {DefaultHeader};
export default DefaultHeader;
