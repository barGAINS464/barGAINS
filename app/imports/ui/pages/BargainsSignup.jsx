import React from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { Container, Form, Grid, Header, Message, Segment } from 'semantic-ui-react';
import swal from 'sweetalert';
import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';
import { ProfileAccounts } from '../../api/profile/ProfileAccount';

/**
 * Signup component is similar to signin component, but we create a new user instead.
 */

class Signup extends React.Component {
  /* Initialize state fields. */
  constructor(props) {
    super(props);
    this.state = { email: '', password: '', error: '', redirectToReferer: false };
  }

  /* Update the form controls each time the user interacts with them. */
  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value });
  }
  /* Handle Signup submission. Create user account and a profile entry, then redirect to the home page. */

  submit(data, formRef) {
    const { email, password } = this.state;
    const { firstName, lastName, date, phoneAreaCode, phoneMid, phoneLast, username } = data;
    const owner = Meteor.user().username;
    Accounts.createUser({ email, username: email, password }, (err) => {
      if (err) {
        this.setState({ error: err.reason });
      } else {
        this.setState({ error: '', redirectToReferer: true });
      }
    });
    ProfileAccounts.collection.insert({ firstName, lastName, date, phoneAreaCode, phoneMid, phoneLast, username, owner }, (error) => {
      if (error) {
        swal('Error', error.message, 'error');
      } else {
        swal('Success', 'Item added successfully', 'success');
        formRef.reset();
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
      <Container id="signup-page" fluid>
        <Grid textAlign="center" verticalAlign="middle" centered columns={2}>
          <Grid.Column>
            <Header as="h2" textAlign="center">
              Register your account
            </Header>
            <Form onSubmit={data => this.submit(data)} >
              <Segment stacked>
                <div className="field">
                  <label>Name</label>
                  <div className="two fields">
                    <div className="field">
                      <input type="text" placeholder="First Name" name='firstName'/>
                    </div>
                    <div className="field">
                      <input type="text" placeholder="Last Name" name='lastName'/>
                    </div>
                  </div>
                </div>
                <div className="two fields">
                  <div className="field">
                    <label>Birthdate</label>
                    <input type="date" placeholder="Date" name='date'/>
                  </div>
                  <div className="field">
                    <label>Phone Number</label>
                    <div className="three fields">
                      <div className="field">
                        <input type="text" placeholder="(xxx)" name='phoneAreaCode'/>
                      </div>
                      <div className="field">
                        <input type="text" placeholder="xxx" name='phoneMid'/>
                      </div>
                      <div className="field">
                        <input type="text" placeholder="xxxx" name='phoneLast'/>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="field">
                  <label>Username</label>
                  <input type="text" placeholder="Username" name='username'/>
                </div>

                <Form.Input
                  label="Email"
                  id="signup-form-email"
                  icon="user"
                  iconPosition="left"
                  name="email"
                  type="email"
                  placeholder="E-mail address"
                  onChange={this.handleChange}
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
Signup.propTypes = {
  location: PropTypes.object,
};

export default Signup;
