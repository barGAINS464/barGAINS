import React from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { Container, Divider, Form, Grid, Header, Message, Segment, Image } from 'semantic-ui-react';
import { Accounts } from 'meteor/accounts-base';

/**
 * Signup component is similar to signin component, but we create a new user instead.
 */
class BargainsSignup extends React.Component {
  /* Initialize state fields. */
  constructor(props) {
    super(props);
    this.state = { email: '', password: '', error: '', file: null, redirectToReferer: false };
    this.handleChange = this.handleChange.bind(this);
  }

  /* Update the form controls each time the user interacts with them. */
  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value, file: URL.createObjectURL(e.image.file[0]) });
  }

  /* Handle Signup submission. Create user account and a profile entry, then redirect to the home page. */
  submit = () => {
    const { email, password } = this.state;
    Accounts.createUser({ email, username: email, password }, (err) => {
      if (err) {
        this.setState({ error: err.reason });
      } else {
        this.setState({ error: '', redirectToReferer: true });
      }
    });
  }

  /* Display the signup form. Redirect to add page after successful registration and login. */
  render() {
    const { from } = this.props.location.state || { from: { pathname: '/add' } };
    // if correct authentication, redirect to from: page instead of signup screen
    if (this.state.redirectToReferer) {
      return <Redirect to={from}/>;
    }
    return (
      <Container id="signup-page">
        <Grid textAlign="center" verticalAlign="middle" centered columns={2}>
          <Grid.Column>
            <Header as="h2" textAlign="center" inverted>Register your account</Header>
            <Divider/>
            <Form onSubmit={this.submit}>
              <Segment stacked>
                <Segment>
                  <Image size='small rounded' src={this.state.file} centered/>
                  <Form.Input
                    label="Upload a Profile Picture"
                    id="signup-form-profilePicture"
                    name="profilePicture"
                    type="file"
                    onChange={this.handleChange}
                    required
                  />
                </Segment>
                <Form.Group widths='equal'>
                  <Form.Input
                    label="First Name"
                    id="signup-form-firstName"
                    name="firstName"
                    type="firstName"
                    placeholder="First Name"
                    onChange={this.handleChange}
                    required
                  />
                  <Form.Input
                    label="Last Name"
                    id="signup-form-lastName"
                    name="lastName"
                    type="lastName"
                    placeholder="Last Name"
                    onChange={this.handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group widths='equal'>
                  <Form.Input
                    label="Birthdate"
                    id="signup-form-birthdate"
                    name="birthdate"
                    type="date"
                    placeholder="Birthdate"
                    onChange={this.handleChange}
                    required
                  />
                  <Form.Input
                    label="Phone number"
                    id="signup-form-phoneNumber"
                    icon="phone"
                    iconPosition="left"
                    name="phoneNumber"
                    type="phoneNumber"
                    placeholder="(xxx) xxx-xxxx"
                    onChange={this.handleChange}
                  />
                </Form.Group>
                <Form.Input
                  label="Email"
                  id="signup-form-email"
                  icon="user"
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
                <Form.Button id="signup-form-submit" content="Submit"/>
              </Segment>
            </Form>
            <Message>
                Already have an account? Login <Link to="/signin">here</Link>
            </Message>
            {this.state.error === '' ? (
              ''
            ) : (
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
