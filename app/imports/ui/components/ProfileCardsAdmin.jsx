import React from 'react';
import { Card, Divider, Icon, Image, List, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';

/** Renders a single profile in the form of an (Admin) card. See pages/ListItemsAdmin.jsx. */
class ProfileCardsAdmin extends React.Component {
  render() {
    return (
      <Card>
        <Card.Content>
          <Card.Header><Image src={this.props.profile.profilePic} wrapped ui={true} avatar/>{this.props.profile.firstName} {this.props.profile.lastName}</Card.Header>
          <Divider/>
          <Card.Meta>
          </Card.Meta>
          <Card.Description>
            <List>
              <List.Item> <Icon name='mail' />{this.props.profile.email}</List.Item>
              <List.Item><Icon name='phone' />{this.props.profile.phone}</List.Item>
              <Divider/>
              <Button compact as={Link} to={`/bprofile/${this.props.profile._id}`} color='teal' basic attached>
                <Button.Content><Icon name='eye'/>View User Page</Button.Content>
              </Button>
            </List>
          </Card.Description>
        </Card.Content>
      </Card>
    );
  }
}

// Require a document to be passed to this component.
ProfileCardsAdmin.propTypes = {
  profiles: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  Profiles: PropTypes.object.isRequired,
};

export default withRouter(ProfileCardsAdmin);
