import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { withRouter, NavLink } from 'react-router-dom';
import { Menu, Dropdown, Header, Icon } from 'semantic-ui-react';
import { Roles } from 'meteor/alanning:roles';

/** The NavBar appears at the top of every page. Rendered by the App Layout component. */
class NavBar extends React.Component {
  render() {
    const menuStyle = {
      marginBottom: '10px',
      backgroundColor: '#206064',
      border: 0,
      borderRadius: 0,
      margin: 0,
      boxShadow: 'none',
      position: 'sticky',
      zIndex: 1 };
    return (
      <Menu style={menuStyle} attached="top" borderless inverted>
        <Menu.Item as={NavLink} activeClassName="" exact to="/" key='landing'>
          <Header inverted as='h1'>barGAINS</Header>
        </Menu.Item>
        {this.props.currentUser ? (
          [<Menu.Item as={NavLink} activeClassName="active" exact to="/add" key='add'>Post Item</Menu.Item>,
            // eslint-disable-next-line react/jsx-key
            <Menu.Item>
              <Dropdown text='Shop'>
                <Dropdown.Menu>
                  <Dropdown.Item text='All Items' as={NavLink} exact to="/shop" key='shop'/>
                  <Dropdown.Item text='Books' as={NavLink} exact to="/books" key='books'/>
                  <Dropdown.Item text='Computers' as={NavLink} exact to="/computers" key='computers'/>
                  <Dropdown.Item text='Music' as={NavLink} exact to="/music" key='music'/>
                </Dropdown.Menu>
              </Dropdown>
            </Menu.Item>,
            <Menu.Item as={NavLink} activeClassName="active" exact to="/about" key='about'>About Us</Menu.Item>]
        ) : ''}
        {Roles.userIsInRole(Meteor.userId(), 'admin') ? (
          [<Menu.Item as={NavLink} activeClassName="active" exact to="/admin" key='admin'>Admin</Menu.Item>,
            <Menu.Item as={NavLink} activeClassName="active" exact to="/profileadmin" key='profileadmin'>ProfileAdmin</Menu.Item>]
        ) : ''}
        {this.props.currentUser === '' ? (
          <Menu.Item position="right">
            <Dropdown id="login-dropdown" text="Login" pointing="top right" icon={'user'} key='login-dropdown'>
              <Dropdown.Menu>
                <Dropdown.Item id="login-dropdown-sign-in" icon="user" text="Sign In" as={NavLink} exact to="/signin" key='signin'/>
                <Dropdown.Item id="login-dropdown-sign-up" icon="add user" text="Sign Up" as={NavLink} exact to="/signup" key='signup'/>
              </Dropdown.Menu>
            </Dropdown>
          </Menu.Item>
        ) : (
          <Menu.Menu position="right" style={menuStyle} attached="top" borderless inverted>
            <Menu.Item as={NavLink} activeClassName="active" exact to="/myprofile" key='myprofile'>My Profile</Menu.Item>
            <Menu.Item key='current-user'><Icon name="user circle"/>{this.props.currentUser}</Menu.Item>
            <Menu.Item>
              <Dropdown id="navbar-current-user" pointing="top right" icon="sign-out alternate" key='navbar-current-user'>
                <Dropdown.Menu>
                  <Dropdown.Item id="navbar-sign-out" icon="sign out" text="Sign Out" as={NavLink} exact to="/signout" key='signout'/>
                </Dropdown.Menu>
              </Dropdown>
            </Menu.Item>
          </Menu.Menu>
        )}
      </Menu>
    );
  }
}

// Declare the types of all properties.
NavBar.propTypes = {
  currentUser: PropTypes.string,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
const NavBarContainer = withTracker(() => ({
  currentUser: Meteor.user() ? Meteor.user().username : '',
}))(NavBar);

// Enable ReactRouter for this component. https://reacttraining.com/react-router/web/api/withRouter
export default withRouter(NavBarContainer);
