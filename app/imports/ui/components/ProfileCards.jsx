import React from 'react';
import { Card, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class ProfileCards extends React.Component {

  render() {
    return (
      <Card centered>
        <Card.Content>
          <Image className='cardImage' src={this.props.pc.profilePicture} wrapped ui={true} rounded/>
          <Card.Header className='cardSpace'> {this.props.pc.firstName} {this.props.pc.lastName}</Card.Header>
          <Card.Description>
              Phone Number {this.props.pc.phone}
              Email {this.props.pc.owner}
          </Card.Description>
          <Card.Meta>
            Username: {this.props.pc.user}
          </Card.Meta>
        </Card.Content>
      </Card>
    );
  }
}

// Require a document to be passed to this component.
ProfileCards.propTypes = {
  pc: PropTypes.object.isRequired,
};
export default withRouter(ProfileCards);
