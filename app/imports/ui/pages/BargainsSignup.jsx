import React from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { Container, Divider, Form, Grid, Header, Message, Segment } from 'semantic-ui-react';
import { Accounts } from 'meteor/accounts-base';
import swal from 'sweetalert';
import { Profiles } from '../../api/profile/Profiles';
/**
 * Signup component is similar to signin component, but we create a new user instead.
 */

class BargainsSignup extends React.Component {
  /* Initialize state fields. */
  /* Initialize state fields. */
  constructor(props) {
    super(props);
    this.state = { email: '', password: '', firstName: '', lastName: '', profilePic: '', phone: '', error: '', redirectToReferer: false };
  }

  /* Update the form controls each time the user interacts with them. */
  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value });
  }

  /* Handle Signup submission. Create user account and a profile entry, then redirect to the home page. */
  submit = () => {
    const { email, password, firstName, lastName, profilePic, phone } = this.state;
    Accounts.createUser({ email, username: email, password, profile: { firstName, lastName, profilePic, phone, owner: email } }, (err) => {
      if (err) {
        this.setState({ error: err.reason });
      } else {
        this.setState({ error: '', redirectToReferer: true });
      }
    });
    Profiles.collection.insert({ email, firstName, lastName, profilePic, phone, owner: email },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Account added successfully', 'success');
        }
      });
  }

  /* Display the signup form. Redirect to add page after successful registration and login. */
  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } };
    // if correct authentication, redirect to from: page instead of signup screen
    if (this.state.redirectToReferer) {
      return <Redirect to={from}/>;
    }
    return (
      <Container id="signup-page">
        <Grid textAlign="center" verticalAlign="middle" centered columns={2}>
          <Grid.Column>
            <Header as="h2" textAlign="center" inverted>
                Register your barGAINS account
            </Header>
            <Divider/>
            <Message
              icon='user circle outline'
              attached
              header='Welcome to the barGAINS site!'
              content='Create a new account in a few, easy steps.'
            />
            <Form onSubmit={this.submit}>
              <Segment stacked>
                <Segment>
                  <Form.Group widths='equal'>
                    <Form.Input
                      label="First Name"
                      id="signup-form-firstname"
                      name="firstName"
                      type="firstName"
                      placeholder="First Name"
                      onChange={this.handleChange}
                      required
                    />
                    <Form.Input
                      label="Last Name"
                      id="signup-form-lastname"
                      name="lastName"
                      type="lastName"
                      placeholder="Last Name"
                      onChange={this.handleChange}
                      required
                    />
                  </Form.Group>
                  <Form.Input
                    label="Profile Picture"
                    id="signup-form-image"
                    icon="image"
                    iconPosition="left"
                    name="profilePic"
                    type="link"
                    placeholder="Please paste a profile picture here"
                    onChange={this.handleChange}
                    required
                  />
                  <Form.Input
                    label="Phone Number"
                    id="signup-form-phoneNum"
                    icon="phone"
                    iconPosition="left"
                    name="phone"
                    type="phone"
                    placeholder="Phone Number"
                    onChange={this.handleChange}
                  />
                </Segment>
                <Segment>
                  <Form.Input
                    label="Email"
                    id="signup-form-email"
                    icon="mail"
                    iconPosition="left"
                    name="email"
                    type="email"
                    placeholder="E-mail address"
                    onChange={this.handleChange}
                    required
                  />
                  <Form.Input
                    label="Password"
                    id="signup-form-password"
                    icon="lock"
                    iconPosition="left"
                    name="password"
                    placeholder="Password"
                    type="password"
                    onChange={this.handleChange}
                    required
                  />
                </Segment>
                <Form.Button id="signup-form-submit" content="Submit"/>
              </Segment>
            </Form>
            <Divider/>
            <Message>
                Already have an account? Login <Link to="/signin">here</Link>
            </Message>
            {this.state.error === '' ? ('') : (
              <Message
                error
                header="Registration was not successful"
                content={this.state.error}
              />
            )}
          </Grid.Column>
        </Grid>
      </Container>
    );
  }
}

/* Ensure that the React Router location object is available in case we need to redirect. */
BargainsSignup.propTypes = {
  location: PropTypes.object,
};

export default BargainsSignup;
