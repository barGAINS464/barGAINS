import React from 'react';
import { Card, Icon, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class ProfileCards extends React.Component {

  render() {
    return (
      <Card>
        <Card.Content>
          <Image
            floated='right'
            size='mini'
            src={this.props.pc.profilePic}
            wrapped ui={true}
            rounded
          />
          <Card.Header>{this.props.pc.firstName} {this.props.pc.lastName}</Card.Header>
          <Card.Meta>Friends of Elliot</Card.Meta>
          <Card.Description>
            <Icon name='phone' />Phone Number {this.props.pc.phone}
            <Icon name='email' />Email {this.props.pc.email}
          </Card.Description>
        </Card.Content>
      </Card>
    );
  }
}

// Require a document to be passed to this component.
ProfileCards.propTypes = {
  pc: PropTypes.object.isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(ProfileCards);
